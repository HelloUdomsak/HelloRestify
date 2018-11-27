# HelloWorld Restify 

This project is Hobby Project intend to practise my programming skill. So this is not CRUD project type.  

## Component

* Vuejs ( embeded in HTML file.)
* Restify ( Fast Nodejs REST framework )
* Mongoose ( MongoDB Nodejs driver )
* apiodc ( Nodejs Document API generator )

## Running

* Please set environment variable or file ```development.json``` in folder ```configs``` 

###  Example configuration 

```
{
    "app": {
        "ip" : "127.0.0.1",
        "port": 3000
    },
    "db": {
        "mongoHost": "",
        "mongoUser": "",
        "mongoPassWord": "",
        "mongoPort": "",
        "dbOptions": {
             
           "useNewUrlParser": true,
           "useCreateIndex:": true,
           "reconnectTries": 10, 
           "reconnectInterval": 500, 
           "poolSize": 10, 
            "bufferMaxEntries": 0,
            "connectTimeoutMS": 10000, 
            "socketTimeoutMS": 45000,
            "family": 4, 
            "auth": {
                "authdb": ""
            }
          }
    },
    "AppDB":{
        "core": ""
    }
}

```
### Environment Variable 

**Linux** 

```
export MONGODB_USER=mongdb_user
export MONGO_PASSWORD=my_mongo_secret
export MONGODB_HOST=127.0.0.1
export MONGODB_PORT=27017
export MONGODB_DATABASE=mydatabase

```

**Windows** 

```
SET MONGODB_USER=mongdb_user
SET MONGO_PASSWORD=my_mongo_secret
SET MONGODB_HOST=127.0.0.1
SET MONGODB_PORT=27017
SET MONGODB_DATABASE=mydatabase
```

## Start project

``` npm run start ```
### Or
``` node api.js ``` 

## TODO.

- [ ] Unit testing.
- [ ] Authentication.
- [ ] Authorization.
- [ ] Document API. 
