const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    code: String,
    value: String,
    header: String,
    subheader: String,
});

categorySchema.statics.associate = function(models) {
    // define association here
};

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
