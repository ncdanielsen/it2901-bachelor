import csv
import json
import time
import pprint
from azure.servicebus import ServiceBusService

#create service bus with key to event hub
sbs = ServiceBusService(service_namespace='recieveZEBevents', shared_access_key_name='RootManageSharedAccessKey', shared_access_key_value='5TxNEcuyyBqg6XyVJ6w2fcybXqs6Oz2BW5kQxMUmql8=')

counter = 0
#Fields in Json file sent to event hub
fields = ("Time", "MonitorControlSystem", "Fridge", "Hob", "Oven", "ExtractionHood", "Dishwasher", "WashingMachine",
 "TumbleDrier", "SocketLivingSouthEntr", "SocketLivingNorth", "SocketKitchen", "SocketBedroom", "SocketBathroom", "Lighting",
 "ShadingSystem", "WindowMotors", "HydroCircPump", "WaterTankLowerCoil", "WaterTankUpperCoil", "VentilationAhu", "VentialtionAHUCoil",
 "HeatPump", "SurfaceCollector", "SolarThermal", "SocketTechnical", "InverterPVSouth", "InverterPVNorth")




csvfile = open('elec_sub_datetime_fix_new.csv', 'r')

reader = csv.DictReader(csvfile, fields)

#sends data to Event Hub row by row
for row in reader:
    s = json.dumps(row)
    sbs.send_event('electdata', s)
    counter +=1
    print("sent lines of electricity data:", counter)
