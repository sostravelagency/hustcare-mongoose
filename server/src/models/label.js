const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    code: String,
    value: String,
});

labelSchema.statics.associate = function(models) {
    // define association here
    // Note: In Mongoose, associations are not typically defined at the schema level like in Sequelize
};

const LabelModel = mongoose.model('Label', labelSchema);

module.exports = LabelModel;
