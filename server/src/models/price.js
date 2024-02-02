const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    code: String,
    value: String,
});

priceSchema.statics.associate = function(models) {
    // define association here
    // Note: In Mongoose, associations are not typically defined at the schema level like in Sequelize
    // Consider defining associations directly in your business logic or middleware.
};

const PriceModel = mongoose.model('Price', priceSchema);

module.exports = PriceModel;
