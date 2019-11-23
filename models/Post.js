const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    username: { type: String, required: true},
    message: { type: String, required: true},
    date: { type: Date, default: Date.now()}
});

module.exports = Post = mongoose.model("Post", postSchema);