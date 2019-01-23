import csv


#convert tab seperated txt file to tab separated csv file

with open('elec_sub_datetime_fix1.txt') as fin, open('elec_sub_datetime_fix_new.csv', 'w') as fout:
    o = csv.writer(fout)
    for line in fin:
        o.writerow(line.split())
