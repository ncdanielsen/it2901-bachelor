
import pandas as pd
import numpy as np

pd.options.display.float_format = '{:.2f}'.format

#read the json file on azure storage blob

#df = spark.read.json('wasb://zebdataraw@zebstorage.blob.core.windows.net/zeb30sec.json')

#Local development was done in Pandas
#pySpark has toPandas method in order to work with pandas dataframes while on a spark env
#pandas_df = df.toPandas()
pandas_df = pd.read_json('zeb30sec.json', lines=True, convert_dates=True)
pandas_df = pandas_df.set_index('date')
pandas_df.index  = pd.to_datetime(pandas_df.index)


#separating energy consumption data and energy generation data

consume_cols = list(pandas_df)
consume_cols.remove('surfacecollector')
consume_cols.remove('solarthermal')
consume_cols.remove('inverterpvsouth')
consume_cols.remove('inverterpvnorth')

produce_cols = list(pandas_df)
produce_cols.append('surfacecollector')
produce_cols.append('solarthermal')
produce_cols.append('inverterpvsouth')
produce_cols.append('inverterpvnorth')


#summarising the energy consumption and energy generation for each row

pandas_df['RowElecConsume'] = pandas_df[consume_cols].sum(axis=1)

pandas_df['RowElecGen'] = pandas_df['surfacecollector'] + pandas_df['solarthermal'] + pandas_df['inverterpvsouth'] + pandas_df['inverterpvnorth']


agg_df = pandas_df[['RowElecConsume','RowElecGen']].copy()


#create new data frame with the Wh difference from last value.
#diffdf is then the energy consumed or generated since last measured value
diffdf = agg_df.diff()

#cleaning the data by removing negative values
diffdf['RowElecConsume']= diffdf[diffdf.RowElecConsume >= 0]

diffdf['RowElecGen'] = diffdf['RowElecGen'][diffdf.RowElecGen >= 0]


#Defining the date ranges for the experiments in the ZEB Lab

Dayidx = pd.date_range('10-09-2015', '24-04-2016')
houridx = pd.date_range('10-09-2015', '24-04-2016', freq = 'H')

#resampling so that dataset has a row for every 30 seconds.

diffdf = diffdf.resample('30S').sum()

#Creating aggregation dataframes

#Daily results
day_results = diffdf.resample('D').sum() / 1000


#Weekly results
weekly_results = diffdf.resample('W').sum() / 1000


#Monthly Results

monthly_results = diffdf.resample('M').sum() / 1000



#Hourly results

hourly_results = diffdf.resample('H').sum() / 1000
hourly_results.fillna(0, inplace=True)



#Dataframes for self consumption


#separating the parts of a day where energy is produced and where energy is not produced
selfconsume = hourly_results[hourly_results.RowElecGen > 1]
self_other = hourly_results[hourly_results.RowElecGen <= 1]

#Differentce between generation and consumption on an hourly basis for hours where energy is produced
self_dif = selfconsume['RowElecGen'] - selfconsume['RowElecConsume']


#Above calculations aggegated to montly values

self_dif_monthly = self_dif.resample('M').sum()
self_month = selfconsume.resample('M').sum()
self_other_month = self_other.resample('M').sum()

#selfconsume['Day'] = selfconsume.index.date
#selfconsume = selfconsume.groupby('Day').sum()


#creation of monthly percentage values for self-consumption and self-generation
self_consume_percent = self_month['RowElecConsume']/(self_month['RowElecConsume'] + self_dif_monthly)
self_consume_percent.fillna(0, inplace=True)
self_consume_percent = self_consume_percent.where(self_consume_percent < 1, 1)
self_generate_percent = self_month['RowElecGen']/(self_other_month['RowElecConsume']+self_month['RowElecConsume'])
self_generate_percent.fillna(0, inplace=True)
self_generate_percent = self_generate_percent.where(self_generate_percent < 1, 1)

selffile = pd.concat([self_consume_percent, self_generate_percent], axis=1)
selffile.columns = ['Self consumption', 'Self generation'] 
selffile.fillna(0,inplace=True)
#selffile = selffile.resample('D').mean()



 
#Creation of daily percentage values for self-consumption and self-generation
#Caps values at 1, representing 100% self generation and self consumption
self_consume_percent_daily = selfconsume['RowElecConsume']/(selfconsume['RowElecConsume'] + self_dif)
self_consume_percent_daily.fillna(0, inplace=True)
self_consume_percent_daily = self_consume_percent_daily.where(self_consume_percent_daily < 1, 1)
self_generate_percent_daily = selfconsume['RowElecGen']/(self_other['RowElecConsume'] + selfconsume['RowElecConsume'])
self_generate_percent_daily.fillna(0, inplace=True)
self_generate_percent_daily = self_generate_percent_daily.where(self_generate_percent_daily < 1, 1)

selffile_daily = pd.concat([self_consume_percent_daily, self_generate_percent_daily], axis=1)
selffile_daily.columns = ['Self consumption', 'Self generation'] 
selffile_daily.fillna(0,inplace=True)

print(hourly_results)
print(day_results)
print(weekly_results)
print(monthly_results)
print(selffile)
print(selffile_daily)





#Convert pandas dataframes to spark dataframes
#hourly_results = sqlContext.createDataFrame(hourly_results)
#day_results = sqlContext.createDataFrame(day_results)
#weekly_results = sqlContext.createDataFrame(weekly_results)
#monthly_results = sqlContext.createDataFrame(monthly_results)

#selffile = sqlContext.createDataFrame(selffile)
#selffile_daily = sqlContext.createDataFrame(selffile_daily)


#Write CSVs to storage blob in azure. coalesce makes sure the data is written to a single file, in stead of multiple,
#which is common as spark is run parallell on multiple machines in the cluster, outputting their own file
#using coalesce to make a single file is for ease of use in powerBI and for publishing the data in. 

#hourly_results.coalesce(1).write.csv('wasb:///hourly_results.csv')

#day_results.coalesce(1).write.csv('wasb:///day_results.csv')

#weekly_results.coalesce(1).write.csv('wasb:///weekly_results.csv')

#monthly_results.coalesce(1).write.csv('wasb:///monthly_results.csv')


#selffile.coalesce(1).write.csv('wasb:///self_consumption_generation_monthly.csv')
#selffile_daily.coalesce(1).write.csv('wasb:///self_consumption_generation_daily.csv')





