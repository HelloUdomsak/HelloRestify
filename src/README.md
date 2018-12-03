# HelloWorld Restify 

This project is Hobby Project intend to practise my programming skill. So this is not CRUD project type.  

## Component

* Vuejs ( embeded in HTML file.)
* Restify ( Fast Nodejs REST framework )
* Mongoose ( MongoDB Nodejs driver )
* apidoc - Try to use [apiary.io](https://apiary.io/) 

## API document
https://hellorestifyapi.docs.apiary.io/#hello

### Apiary.io Testing 

```
npm install -g dredd
```

**NOTE**  Currently dredd install on Windows have problem so i does not create API unit test.
  

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

# Design goal 
However my code is simple.  My goal is   fast-throughput , simple and compatible with container environment ( Kubernetes ).    

## Component 

- Restify  is  nodejs REST API framework that minimal run in async and use in many of production site.  Can integrate with other function later via plugin ( authentication, etc. ). Restify them self just provide request and response and some basic function. 

 - Mongoose is Mongodb ORM framework. this make me easy to control database schema and function connect database and it make code standard more than write my own function to dealing with database operation.  Mongoose also provide enough function.      

## Code-Design 

-  Can define config to apply via Environment variable, even if you want to run without  environment variable can do too that can be done via configuration file instead.  

-  Use configuration file instead hard-code in application  source-code application that easy to maintain and well structure. 

-  Split  API functional outside main-code then call integrate later ( "require"  ) . my point it easy to read the code than pack all in one ( monolith ). 

-  Use mongodb connection as reuse connection ( define in global object scope ) , instead of  open connection at API function side. 

-  Split each function work per folder and in each folder also contain database schema too. ( model file ).  intend to grouping function together in one place ( API Controller and Database model in same folder ) .          
