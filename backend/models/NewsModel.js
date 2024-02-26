const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    publicationDate: Date,
    tags: [String],
    featuredImage: String,
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [
      {
        commenter: String,
        content: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    collection: "News",
    timestamps: true,
  }
);

const News = mongoose.model("News", NewsSchema);

module.exports = News;
