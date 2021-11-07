const mongoose = require('mongoose')

const classCategoriesSchema = mongoose.Schema({
    categoryId: Number, 
    name: String, 
    image: String,
});

module.exports = mongoose.model('classCategories', classCategoriesSchema);
