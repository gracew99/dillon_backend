const mongoose = require('mongoose')

const gymClassesSchema = mongoose.Schema({
    instructor: String, 
    title: String, 
    // topics: [String],
    // imageUrl: String, 
    date: Date,
    description: String,  
    nextSessions: [Date],
    numEnrolled: Number,
    categoryIds: [Number],
    image: String
    // password: String
});

module.exports = mongoose.model('gymClasses', gymClassesSchema);
