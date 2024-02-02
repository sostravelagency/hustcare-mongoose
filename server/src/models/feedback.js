const mongoose = require('mongoose');
const timestampPlugin = require('mongoose-timestamp');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    titlePost: String,
    rating: Number,
    content: String,
});
feedbackSchema.plugin(timestampPlugin)
const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = FeedbackModel;
