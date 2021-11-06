const mongoose = require('mongoose')

const classCategoriesSchema = mongoose.Schema({
    classes: [String], 
    date: Date
});

module.exports = mongoose.model('userClasses', classCategoriesSchema);
