import json
import math
from os.path import dirname, abspath
from datetime import timezone
import datetime

# Everything written here is a mess

def gen_time_data1(building_id, kpi_id, kpi_func, start, end):
    values = []
    times = []   
    for i in range(start, end+1):
        for m in range(1, 13):
            for d in range(1, 32):
                try: 
                    dt = datetime.datetime(i, m, d)
                    timestamp = dt.replace(tzinfo=timezone.utc).timestamp()
                    times.append(timestamp)
                    values.append(kpi_func(i))
                except:
                    pass
    return {"building_id": building_id, "kpi_id": kpi_id, "values": values, "times": times}

def gen_time_data2(neighbourhood_id, kpi_id, kpi_func, start, end):
    # Screw DRY and naming conventions :) 
    values = []
    times = []   
    for i in range(start, end+1):
        for m in range(1, 13):
            for d in range(1, 32):
                try: 
                    dt = datetime.datetime(i, m, d)
                    timestamp = dt.replace(tzinfo=timezone.utc).timestamp()
                    times.append(timestamp)
                    values.append(kpi_func(i))
                except:
                    pass
    return {"neighbourhood_id": neighbourhood_id, "kpi_id": kpi_id, "values": values, "times": times}

if __name__ == '__main__':
    building_data_path = dirname(dirname(abspath(__file__))) + "/mock-data/buildingkpi.json"
    neighbourhood_data_path = dirname(dirname(abspath(__file__))) + "/mock-data/neighbourhoodkpi.json"
    building_ids = list(range(1, 6))
    kpi_ids = list(range(1, 24))
    start=1995; end=2015
    building_data = []
    neighbourhood_data = []
    for bid in building_ids:
        for kid in kpi_ids:
            building_data.append(gen_time_data1(bid, kid, lambda x: abs(math.sin(x))*1000, start, end))
            neighbourhood_data.append(gen_time_data2(bid, kid, lambda x:abs(math.sin(x))*1000, start, end))
    with open(building_data_path, 'w') as f:
        json.dump(building_data, f, indent=2)
    with open(neighbourhood_data_path, 'w') as f:
        json.dump(neighbourhood_data, f, indent=2)
        
    

        
    