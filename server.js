const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose')
const GymClasses = require('./gymClassesModel.js')
const ClassCategories = require('./classCategoriesModel.js')
const UserClasses = require('./userClassesModel.js')
const dotenv = require('dotenv').config();


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(express.static(path.join(__dirname, "..", "build")));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
  res.setHeader("Access-Control-Allow-Headers", "*"),
  next();
})
const connection_url = process.env.MONGO_URL;
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



  // return upcoming classes userId is registered for
  app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    
    var getClasses = function(id, callback) {
        UserClasses.find({_id: id, date : {$gte: new Date().setHours(0,0,0,0)}}, (err, data) => {
            if (err) {
                callback(err, 0)
            } else {
                callback(null, data)
            }
        })
            // .sort("date")
            // .exec((err, data) => {
            //     callback(err, data);
            // });
    };
  
    getClasses(userId, function(err, data) {
        if (err) { 
            console.log("ERR")
            console.log(err)
            res.status(500).send(err);
        } else {
            console.log("yay")
            console.log(data)
            res.status(200).send(data)
        }
    });
  })

// return list of classes happening today
app.get('/classes', (req, res) => {    
    var getClasses = function(callback) {
        GymClasses.find({date : {$gte: new Date().setHours(0,0,0,0), $lt: new Date().setHours(23, 59, 59, 999)}}, (err, data) => {
            if (err) {
                callback(err, 0)
            } else {
                callback(null, data)
            }
        })
    };
  
    getClasses(function(err, data) {
        if (err) { 
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    });
  })

  // return list of class categories
app.get('/classes/categories', (req, res) => {  
    var getCategories = function(callback) {
        ClassCategories.find({}, (err, data) => {
            if (err) {
                callback(err, 0)
            } else {
                callback(null, data)
            }
        })
           
        }
  
    getCategories(function(err, data) {
        if (err) { 
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    });
  })

  // return information about a specific class
  app.get('/classes/info/:classId', (req, res) => {
    const classId = req.params.classId;
    

    GymClasses.find({_id: classId}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })  
    
  })


    // return list of classes for specific category
    app.get('/classes/categories/:categoryId', (req, res) => {
        const categoryId = req.params.categoryId;
        
        
        GymClasses.find({categoryIds: categoryId}, (err, data) => {
            if (err) {
                console.log("ERR")
                console.log(err)
                res.status(500).send(err)
            } else {
                console.log(data)
                res.status(200).send(data)
            }
        })
               
   
      })


      // return list of classes for specific date
    app.get('/classes/:date', (req, res) => {
        const date = req.params.date;
            GymClasses.find({date: {$gte: new Date(parseInt(date, 10)).setHours(0,0,0,0), $lt: new Date(parseInt(date, 10)).setHours(23, 59, 59, 999)}}, (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(500).send(err)
                } else {
                    console.log(data)
                    res.status(200).send(data)
                }
            })
       
      })


      app.listen(process.env.PORT || 8000, () =>
        console.log(`Express server is running on localhost:${process.env.PORT || 8000}`)
    );