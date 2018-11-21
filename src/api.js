const serverConfig = require('./lib/configuration')
const restify = require('restify')
const mongoose = require('mongoose')
const restifyPlugins = require('restify-plugins')

/** Use Pino as Logger  */
const logger = require('pino')()

/** 
 *  Initiallize Server
 */

 const server = restify.createServer({
     name: 'Hello API',
     version: '0.1.0'
 })

 server.use(restifyPlugins.jsonBodyParser( { mapParams: true }))
 server.use(restifyPlugins.acceptParser(server.acceptable))
 server.use(restifyPlugins.queryParser({ mapParams: true}))
 server.use(restifyPlugins.fullResponse())

 /** Use Restify with pino ( high performance logger ) */
 server.use(require('restify-pino-logger')())


 /**
  *  Server Configuration file setting under $APP_ROOT/configs/${ environment_depend_on}
  */
 server.listen(3000, () =>{

    mongoose.Promise = global.Promise
    constructUri = 'mongodb://' + serverConfig.get('db:mongoUser') + ':' 
         + ( process.env.MONGO_PASSWORD || serverConfig.get('db:mongoPassWord')) 
         + '@'
         + serverConfig.get('db:mongoHost') 
         + ':' + serverConfig.get('db:mongoPort') 
         + '/' + serverConfig.get('AppDB:core')

     mongoose.connect(constructUri, serverConfig.get('db:dbOptions'))
     const db = mongoose.connection

     db.on('error', (err) => {
         logger.error(err);
         process.exit(1);
     })
     db.once('open', () => {
         /** 
          * Load Controller + Model 
          * Each Controller combined with Model ( Schema file ) I'm call Action  
          * */
         require('./actions/hello')(server)
        /**
         * Load Static with Restify servstatic
         */
        server.get('/*', restify.plugins.serveStatic({
            directory: './static/hello',
            default: 'index.html'
        }));

         logger.info('Server listeing on Port ' + serverConfig.get('app:port'))
         console.log('Server listening on Port 3000 ')
     })
 })