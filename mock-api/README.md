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
2. Run `$ python utilities/gen_kpi.py`
2. Launch database if not running 
   1. ` mongod --dbpath <path-to-db>  ` 
   2. To monitor database: `mongo` in terminal
   3. To init database, run: `node utilities/db_writer.js`
3. Execute the following in a terminal in the mock-api folder:
   1.  ` npm install ` 
   2.  ` npm start ` 
4. NOTE: Closing the terminal also stops the server. It also be quit using ctrl + c 
   To send requests, go to “localhost:4000” in browser. 




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



### ../buildingkpi/{buildingID}-{kpiID}
Returns a list of KPI values for the specified buildingID and kpiID.

**Data format:**

```{js}
[{
    building_id: int, 
    kpi_id: int, 
    values: [float] // list of floats
    times: [float] // list of floats (unix time)
}]
```



### ../neighborhoodkpi/{neighbourhoodID}-{kpiID}

Return KPI data for neighborhood as a JSON.

**Data format:**

```{js}
[{
    neighbourhood_id: int, 
    kpi_id: int, 
    values: [float] // list of floats
    times: [float] // list of floats (unix time)
}]
```




## Upload-functions


### ../users/signup

POST request that takes in email and password, and creates a user.

**User format**
``` JS
[{
    _id: mongoose.Schema.Types.ObjectId, // automatic and unique id created by mongoose.
    email: String, // is unique.
    password: String, // is currently not hashed and is stored as plain text. No real life information should be stored.
    superuser: boolean, // is meant to determine if the user should have access to restricted data. Currently there is no way to make a user into a superuser outside of the backend.
    admin: boolean // is meant to give authorized users the ability to create and delete other users. Currently there is no way to make a user into an admin outside of the backend. 

}]
```
**Upload format:**

``` json
{
    email: String, // is unique.
    password: String, // is currently not hashed and is stored as plain text. No real life information should be stored.
}
```


### ../users/login

POST request that takes in email and password, and checks the info against the database. Returns a token that is encoded.

**Data format:**

``` json
{
    email: String, 
    password: String 

}
```


### ../users/delete/{userID}

Delete request that deletes the user specified in the url. Valid token must be included in the header authorization field

**Data format:**

``` json
[{
    Authorization: "Bearer " + token 
}]
```



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
 