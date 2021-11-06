const mongoose = require('mongoose')

const classCategoriesSchema = mongoose.Schema({
    categoryId: Number, 
    name: String, 
});

module.exports = mongoose.model('classCategories', classCategoriesSchema);
