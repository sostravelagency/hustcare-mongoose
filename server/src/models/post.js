const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  star: String,
  labelCode: String,
  address: String,
  // attributeId: String,
  categoryCode: String,
  priceCode: String,
  areaCode: String,
  description: String,
  status: String,
  // userId: String,
  // overviewId: String,
  // imageId: String,
  provinceCode: String,
  priceNumber: Number,
  areaNumber: Number,
  utilities: String,
  imageId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image' // Chắc chắn đặt đúng tên model mà bạn sử dụng trong ref
  }],
  attributeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute' // Chắc chắn đặt đúng tên model mà bạn sử dụng trong ref
  },
  overviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Overview' // Chắc chắn đặt đúng tên model mà bạn sử dụng trong ref
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Chắc chắn đặt đúng tên model mà bạn sử dụng trong ref
  },
});

postSchema.statics.associate = function (models) {
  // define association here
  // Note: In Mongoose, associations are not typically defined at the schema level like in Sequelize
  // Consider defining associations directly in your business logic or middleware.
};

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
