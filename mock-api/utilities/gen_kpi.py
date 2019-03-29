import json
import math
from os.path import dirname, abspath
from datetime import timezone
import datetime
def gen_time_data(building_id, kpi_id, kpi_func, start, end):
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

if __name__ == '__main__':
    path = dirname(dirname(abspath(__file__))) + "/mock-data/buildingkpi.json"
    fname = "buildingkpis"
    building_ids = list(range(1, 6))
    kpi_ids = list(range(1, 24))
    start=1995; end=2015
    data = []
    for bid in building_ids:
        for kid in kpi_ids:
            data.append(gen_time_data(bid, kid, lambda x: abs(math.sin(x))*1000, start, end))
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
        
    

        
    