/**
 * Helloworld mongoose functions
 */
const errors = require('restify-errors')

/**
 *  Get Model HelloWorld Schema
 */
const HelloWorld = require('./model/helloSchema')

module.exports = function(server){

    /**
     * Method HTTP POST
     */
    server.post('/hello', (req, res, next) =>{
        if(!req.is('application/json')){
            return next(
                new errors.InvalidContentError("We need 'application/json' only")
            )
        }
        let data = req.body || {}
        let _hello = new HelloWorld(data)
        _hello.save(function(err){
            if(err) {
                req.log.error(err)
                return next(new errors.InternalError(err.message))
                next()
            }
            res.send("{ message: 'Got it'}")
            next()
        })
    })

    /** 
     * GET
     */
    server.get('/hello', (req, res, next) => {
        let _hello = HelloWorld
        _hello.find({}, function(err, doc){
            if(err) {
                console.error(err)
                return next(

                    /** Some case cause fatal exit I'm decie to use normal logging exception instead return exception 
                     * new errors.InvalidContentError(err.errors)
                     * 
                    */ 
                    req.log.error(err)
                )
            }
            res.json(doc)
            next()
        })
    })

}