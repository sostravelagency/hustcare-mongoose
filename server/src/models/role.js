const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    code: String,
    value: String,
});

roleSchema.statics.associate = function(models) {
    // define association here
    // Note: In Mongoose, associations are not typically defined at the schema level like in Sequelize
    // Consider defining associations directly in your business logic or middleware.
};

const RoleModel = mongoose.model('Role', roleSchema);

module.exports = RoleModel;
