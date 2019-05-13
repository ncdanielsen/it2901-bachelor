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
        If more information about the data models is wanted, see the documentation in each of the schemas.

## Download functions


### ../ckpi/ 

Returns a set of predefined Calculated KPI values, which is analogous to
actual sensor data from buildings.

  - Method:  
    GET

  - Response:
    
    ``` JS
    
        _id: Number,
        name: String,
        description: String,
        created: Date,
        lastUpdated: Date,
        owner: String,
        values: [
          {
           name: String,
           data: [
            {time: Date, value: Number, weight: Number}
           ]
          }
        ]
    ```

### ../rkpi/

Returns a set of predefined Reference KPI values.

  - Method:  
    GET

  - Response:
    
    ``` JS
    
        _id: Number,
        name: String,
        description: String,
        created: Date,
        lastUpdated: Date,
        owner: String,
        values: [
         {name: String, value: Number, weight: Number}
        ]
    ```

### ../kpi-list/categories

Return a list of all available categories of kpis, with KPIs included

  - Method:  
    GET

  - Response:
    
    ```  JS
    
        id: Integer,
        name: string, 
        children: [ // Note: Same list of JSONs as in kpi-list
            {
                id: Integer,
                unit: String,
                type: Number, // (Float, Integer, datetime, etc)
                timeseries: Boolean 
                description: String // I.e. "Amount of energy the building has delivered to national grid" 
                
                // Note: In database, use only id. Then combine in the backend. 
            }
        ]
    ```



### ../kpi-list/list

Returns all possible KPIs as JSON

  - Method:  
    GET

  - Response:
    
    ``` JS
    
        id: Integer,
        name, 
        unit: String, // "kw/h", "%" 
        type: Number, // (Float, Integer, datetime, etc)
        timeseries: Boolean 
        description: String // I.e. "Amount of energy the bulding has delivered to national grid" 
    ```
 

### ../buildingkpi/{buildingID}-{kpiID}

NOTE: Is currently not used by the frontend.

Returns a list of KPI values for the specified buildingID and kpiID.

  - Method:  
    GET

  - URL Parameters:
    
    ``` JS
    
        building_id: Number, 
        kpi_id: Number
    ```

  - Response:
    
    ``` JS
    
        building_id: Integer, 
        kpi_id: Integer, 
        values: [Float] // list of Floats
        times: [Float] // list of Floats (unix time)
    ```



### ../neighborhoodkpi/{neighbourhoodID}-{kpiID}

NOTE: Is currently not used by the frontend.

Return KPI data for neighborhood as a JSON.

  - Method:  
    GET

  - URL Parameters:
    
    ``` JS
    
        neighbourhood_id: Number, 
        kpi_id: Number
    ```

  - Response:
    
    ``` JS
    
        neighbourhood_id: Integer, 
        kpi_id: Integer, 
        values: [Float] // list of Floats
        times: [Float] // list of Floats (unix time)
    ```



### ../users/profile

Returns a JSON containing information about the user currently logged
in.

  - Method:  
    GET

  - Response:
    
    ``` JS
    
        _id: ObjectId, // automatic and unique id created by database.
        email: String, // is unique.
        superuser: Boolean, //
        admin: Boolean 
    ```



## Upload-functions


### ../users/signup

POST request that takes in email and password, and creates a user.

NOTE: Passwords are currently not hashed and are stored as plain text.
No real passwords should be stored here.

  - Method:  
    POST

  - Data Parameters:
    
    ``` JS
    
        email: String, 
        password: String
    ```


### ../users/login

POST request that takes in email and password, and checks the info
against the database. Returns a JSON web token.

  - Method:  
    POST

  - Data Parameters:
    
    ``` JS
    
        email: String, 
        password: String
    ```

  - Response:
    
    ``` JS
    
        token: String // JSON web token. Explanation at Middleware Functions down below in the document.
    ```


### ../rkpi

Uploads a new set of RKPI values.

  - Method:  
    POST

  - Data Parameters:
    
    ``` JS
    
        name: String,
        created: Date,
        owner: String,
        description: String,
        values: [
            {name: String, value: Number, weight: Number}
        ]
    ```

### ../ckpi/ 

Uploads a new set of CKPI values.

  - Method:  
    POST

  - Data Parameters:
    
    ``` JS
    
        name: String,
        description: String,
        created: Date,
        owner: String,
        values: [
          {
           name: String,
           data: [
            {time: Date, value: Number, weight: Number}
           ]
          }
        ]
    ```

## Delete-functions

### ../users/{userID}

Deletes the user specified in the URL parameter

  - Method:  
    Delete

  - URL Parameters:
    
    ``` JS
    
        userID: String
    ```

### ../ckpi/ 

Deletes the set of CKPI values specified in the request body

  - Method:  
    DELETE

  - Data Parameters:
    
    ``` JS
        
        _id: String,
    ```

### ../rkpi

Deletes the set of specified RKPI values

  - Method:  
    Delete

  - Data Parameters:
    
    ``` JS
    
        _id: String
    ```

## Update-functions

### ../ckpi/ 

Updates the set of specified CKPI values with the new values provided

  - Method:  
    PUT

  - Data Parameters:
    
    ``` JS
        
        _id: String,
        name: String,
        description: String,
        created: Date,
        owner: String,
        values: [
          {
           name: String,
           data: [
            {time: Date, value: Number, weight: Number}
           ]
          }
        ]
    ```

### ../rkpi

Updates the set of specified RKPI values with the new ones provided

  - Method:  
    PUT

  - Data Parameters:
    
    ``` JS
    
        _id: String,
        name: String,
        created: Date,
        owner: String,
        description: String,
        values: [
            {name: String, value: Number, weight: Number}
        ]
    ```



## Middleware-functions

### check_token_validity

Because of the user system, all functions except "../users/login" and
"../users/signup" will require a valid token to work. This token is a JSON
web token with documentation available at https://jwt.io/. This token
must be located in the header authorization field.

  - Header Parameters:
    
    ``` JS
    
        Authorization: "Bearer " + token
    ```


# How to develop in Express.js

The code is document especially well in selected methods to give an example. 

Note, all this happens in /mock-api/ 

To take a tour of the code using the comments, start with app.js. s

## To use Mongoose models, use the following names for the Schemas: 
 - KPI Categories:
    - Categories of KPI 
 - KPI Metadata 
    - Metadata assiciated with each KPI 
 
