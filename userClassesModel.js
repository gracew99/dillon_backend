const mongoose = require('mongoose')

const classCategoriesSchema = mongoose.Schema({
    classes: [Date], 
    date: Date
});

module.exports = mongoose.model('userClasses', classCategoriesSchema);
