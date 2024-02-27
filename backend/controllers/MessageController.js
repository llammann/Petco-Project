const Message = require("../models/MessageModel");

// GET
const getAllMessages = async (req, res) => {
  const allMessages = await Message.find({});
  res.send(allMessages);
  console.log("GET MESSAGES");
};

// DELETE
const deleteMessage = async (req, res) => {
  const _id = req.params.id;

  await Message.findByIdAndDelete(_id);
  console.log("DELETE MESSAGE");
};

// POST
const postMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  newMessage.save();
  console.log("POST MESSAGE");
};

// GET MESSAGE BY ID
const getMessageById = async (req, res) => {
  let messageId = req.params.id;
  let findMessage = await Message.findOne({ _id: messageId });
  res.send(findMessage);

  console.log("GET MESSAGE BY ID");
};

// PUT MESSAGE
const putMessage = async (req, res) => {
  let messageId = req.params.id;
  let updatedMessage = await Message.replaceOne({ _id: messageId }, req.body);
  console.log("PUT MESSAGE", updatedMessage);
};

// PATCH MESSAGE
const patchMessage = async (req, res) => {
  let messageId = req.params.id;
  let updatedMessage = await Message.findOneAndUpdate({ _id: messageId }, req.body);
  console.log("GET UPDATE MESSAGE", updatedMessage);
};

module.exports = {
  patchMessage,
  putMessage,
  getMessageById,
  postMessage,
  deleteMessage,
  getAllMessages,
};
