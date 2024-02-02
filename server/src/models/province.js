const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    code: String,
    value: String,
});

provinceSchema.statics.associate = function(models) {
    // define association here
    // Note: In Mongoose, associations are not typically defined at the schema level like in Sequelize
    // Consider defining associations directly in your business logic or middleware.
};

const ProvinceModel = mongoose.model('Province', provinceSchema);

module.exports = ProvinceModel;
