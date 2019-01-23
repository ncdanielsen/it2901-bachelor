SELECT
    CAST(UDF.convertStringtoDate(Time) as datetime) as date,
    CAST(MonitorControlSystem as float) as MonitorControlSystem,
    CAST(Fridge as float) as Fridge,
    Cast(Hob as float) as Hob,
    CAST(Oven as float) as Oven,
    CAST(ExtractionHood as float) as ExtractionHood,
    CAST(Dishwasher as float) as Dishwasher,
    CAST(WashingMachine as float) as WashingMachine,
    CAST(TumbleDrier as float) as TumbleDrier,
    CAST(SocketLivingSouthEntr as float) as SocketLivingSouthEntr,
    CAST(SocketLivingNorth as float) as SocketLivingNorth,
    CAST(SocketKitchen as float) as SocketKitchen,
    CAST(SocketBedroom as float) as SocketBedroom,
    CAST(SocketBathroom as float) as SocketBathroom,
    CAST(Lighting as float) as Lighting,
    CAST(ShadingSystem as float) as ShadingSystem,
    CAST(WindowMotors as float) as WindowMotors,
    CAST(HydroCircPump as float) as HydroCircPump,
    CAST(WaterTankLowerCoil as float) as WaterTankLowerCoil,
    CAST(WaterTankUpperCoil as float) as WaterTankUpperCoil,
    CAST(VentilationAhu as float) as VentilationAhu,
    CAST(VentialtionAHUCoil as float) as VentilationAHUCoil,
    CAST(HeatPump as float) as HeatPump,
    CAST(SurfaceCollector as float) as SurfaceCollector,
    CAST(SolarThermal as float) as SolarThermal,
    CAST(SocketTechnical as float) as SocketTechnical,
    CAST(InverterPVSouth as float) as InverterPVSouth,
    CAST(InverterPVNorth as float) as InverterPVNorth
INTO 
    zebdataraw
FROM
    ElectricityStream