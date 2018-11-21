/**
 * Schema HelloWorld Service 
 */

 const mongoose = require('mongoose')
 const mongooseStringQuery = require('mongoose-string-query')
 const timeStamps = require('mongoose-timestamp')

 const HelloWorldSchema = new mongoose.Schema(
     {
         message: {
             type: String,
             required: true,
             trim: true
         }
     },
    { minimize: false,
      autoCreate: true
    }
 )
 HelloWorldSchema.plugin(timeStamps)
 HelloWorldSchema.plugin(mongooseStringQuery)

 const HelloWorld = mongoose.model('HelloWorld', HelloWorldSchema)
 module.exports = HelloWorld

