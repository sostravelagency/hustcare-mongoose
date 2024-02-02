const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    code: String,
    value: String,
});

const AreaModel = mongoose.model('Area', areaSchema);

export default AreaModel;
