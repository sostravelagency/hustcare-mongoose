const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    code: String,
    value: String,
});

positionSchema.statics.associate = function(models) {
    // define association here
    // Note: In Mongoose, associations are not typically defined at the schema level like in Sequelize
};

const PositionModel = mongoose.model('Position', positionSchema);

module.exports = PositionModel;
