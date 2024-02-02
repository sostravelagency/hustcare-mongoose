const mongoose = require('mongoose');

const overviewSchema = new mongoose.Schema({
    code: String,
    area: String,
    type: String,
    target: String,
    bonus: String,
    created: String,
    expire: String,
});

overviewSchema.statics.associate = function(models) {
    // define association here
    // Note: In Mongoose, associations are not typically defined at the schema level like in Sequelize
};

const OverviewModel = mongoose.model('Overview', overviewSchema);

module.exports = OverviewModel;
