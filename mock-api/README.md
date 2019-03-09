# How to run the backend mock of the REST API

The backend uses a MongoDB database, and runs a express.js server on Nodejs. 

## Prerequisites: 
 - Mongodb available here: 
    - https://docs.mongodb.com/manual/administration/install-community/ 
      NOTE: To use the previously generated database, download the file from here (available soon), and start the db as follows:
  - ``` mongod --dbpath <path to database file>  ``` 
  - Nodejs and NPM:
    - Windows or Mac: https://nodejs.org/en/download/ 
    - Linux Terminal: https://nodejs.org/en/download/package-manager/ 
      - Ubuntu: 
        - ``` curl -sL https://deb.nodesource.com/setup_10.x | sudo bash - ``` 
         ``` sudo apt install nodejs ``` 
    - Confirm installation in terminal with:
      - ` node -v `
      - ` npm -v ` 

## Running 

1. Open terminal in folder “mock-api”
   1. Protip for Windows: Find folder in explorer and type “CMD” in address bar
2. Launch database if not running 
   1. ` mongod --dbpath <path-to-db>  ` 
   2. To monitor database: `mongo` in terminal
3. Execute the following in a terminal in the mock-api folder:
   1.  ` npm install ` 
   2.  ` npm start ` 
4. NOTE: Closing the terminal also stops the server. It also be quit using ctrl + c 
   To send requests, go to “localhost:3000” in browser. 




# REST API Definition 

> NOTE: This is a defintion to mock the real rest API. Changes may occur 

## Download functions

### ../kpi-list/categories

Return a list of all available categories of kpis, with KPIs included 

``` JS
[{
    id: int,
    name: string, 
    children: [ // Note: Same list of JSONs as in kpi-list
        {
            id: int,
            unit: String,
            type: Number type, // (float, int, datetime, etc)
    		timeseries: Boolean 
            description: String // I.e. "Amount of energy the bulding has delivered to 										national grid" 
            
            // Note: In database, use only id. Then combine in the 				backend. 
        }
    ]
}]
```



### ../kpi-list/list

Returns all possible KPIs as JSON

``` JS
[{
    id: int,
    name, 
    unit: String, // "kw/h", "%" 
    type: Number type, // (float, int, datetime, etc)
    timeseries: Boolean 
    description: String // I.e. "Amount of energy the bulding has delivered to national 							grid" 
}]
```

 

### ../buildings/

Returns a list of all buildings as JSON

```JS
[{
    id: int,
    name: String, 
    adress: String, 
    neighborhood: neighborhood_id, 
}]
```



### ../neighborhoods/

Returns a lift of all buildings as JSON

```JS
[{
    id: int, 
    name: String, 
    buildings: [building_id] // List of building IDs 
}]
```



### ../buildingkpi/{buildingID}/?kpiID={kpiID}

Return KPI data for building as a JSON with the following parameters: 

- kpi-id: int 
  - Select one type of kpi data is selected for 
- kpi-id: [int,..]
  - Selects several kpis data is selected for 
- time: [start (int), end(int)]
  - Limit time range of data 
  - Start and end as unix-time integers

Sample link: ` example.com/buildingkpi/011234/?kpi-id=123, time=[0, 360]`

This will return an array of data in KPI #123 between 00:00 and 1:00 January 1st, 1970. 

The JSON is a list of atomic KPI datapieces.

**Data format:**

```{js}
[{
    buildingID: int, 
    kpiID: int, 
    timestamp: datetime, 
    // For more detailed metadata, use the calls for info about buildings, kpis etc above
    value: float
}]
```



### ../neighborhoodkpi/{neighborhoodID}/?kpiID={kpiID}

Return KPI data for neighborhood as a JSON with the following parameters: 

- kpi-id: int 
  - Select one type of kpi data is selected for 
- kpi-id: [int,..]
  - Selects several kpis data is selected for 
- time: [start (int), end(int)]
  - Limit time range of data 
  - Start and end as unix-time integers

Sample link: ` example.com/neigborhoodkpi/011234/?kpi-id=123, time=[0, 360]`

This will return an array of data in KPI #123 between 00:00 and 1:00 January 1st, 1970. 

The JSON is a list of atomic KPI datapieces.

## Upload-functions

> Not yet defined 

# How to develop in Express.js

The code is document especially well in selected methods to give an example. 

Note, all this happens in /mock-api/ 

To take a tour of the code using the comments, start with app.js. s

## To use Mongoose models, use the following names for the Schemas: 
 - KPI Categories:
    - Categories of KPI 
 - KPI Metadata 
    - Metadata assiciated with each KPI 
 