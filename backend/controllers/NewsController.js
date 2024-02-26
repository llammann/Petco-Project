const News = require("../models/NewsModel");

// GET
const getAllNews = async (req, res) => {
  const allNews = await News.find({});
  res.send(allNews);
  console.log("GET NEWS");
};

// DELETE
const deleteNews = async (req, res) => {
  const _id = req.params.id;

  await News.findByIdAndDelete(_id);
  console.log("DELETE NEWS");
};

// POST
const postNews = async (req, res) => {
  const newNews = new News(req.body);

  newNews.save();
  console.log("POST NEWS");
};

// GET NEWS BY ID
const getNewsById = async (req, res) => {
  let newsId = req.params.id;
  let findNews = await News.findOne({ _id: newsId });
  res.send(findNews);

  console.log("GET NEWS BY ID");
};

// PUT NEWS
const putNews = async (req, res) => {
  let newsId = req.params.id;
  let updatedNews = await News.replaceOne({ _id: newsId }, req.body);
  console.log("PUT NEWS", updatedNews);
};

// PATCH NEWS
const patchNews = async (req, res) => {
  let newsId = req.params.id;
  let updatedNews = await News.findOneAndUpdate({ _id: newsId }, req.body);
  console.log("GET UPDATE NEWS", updatedNews);
};

module.exports = {
  patchNews,
  putNews,
  getNewsById,
  postNews,
  deleteNews,
  getAllNews,
};
