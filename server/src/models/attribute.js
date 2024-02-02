const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
    price: String,
    acreage: String,
    published: String,
    hashtag: String,
});

attributeSchema.statics.associate = function(models) {
    // define association here
    // Attribute.hasOne(models.Post, {foreignKey: 'attributeId', as: 'attributes'});
};

const AttributeModel = mongoose.model('Attribute', attributeSchema);

module.exports = AttributeModel;
