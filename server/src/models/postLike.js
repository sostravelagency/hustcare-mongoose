const mongoose = require('mongoose');

const postLikeSchema = new mongoose.Schema({
    userId: String,
    postId: String,
});

postLikeSchema.statics.associate = function(models) {
    // define association here
    // Note: In Mongoose, associations are not typically defined at the schema level like in Sequelize
    // Consider defining associations directly in your business logic or middleware.
};

const PostLikeModel = mongoose.model('PostLike', postLikeSchema);

module.exports = PostLikeModel;
