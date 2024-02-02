const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  phone: String,
  zalo: String,
  fbUrl: String,
  roleCode: String,
  positionCode: String,
  avatar: String,
  positionData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position'  // Thay đổi thành tên model của Position
  },
  roleData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'  // Thay đổi thành tên model của Role
  },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
