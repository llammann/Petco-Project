const Email = require("../models/EmailModel");

// GET
const getAllEmail = async (req, res) => {
  const allEmail = await Email.find({});
  res.send(allEmail);
  console.log("GET EMAIL");
};

// DELETE
const deleteEmail = async (req, res) => {
  const _id = req.params.id;

  await Email.findByIdAndDelete(_id);
  console.log("DELETE EMAIL");
};

// POST
const postEmail = async (req, res) => {
  const newEmail = new Email(req.body);

  newEmail.save();
  console.log("POST EMAIL");
};

// GET EMAIL BY ID
const getEmailById = async (req, res) => {
  let emailId = req.params.id;
  let findEmail = await Email.findOne({ _id: emailId });
  res.send(findEmail);

  console.log("GET EMAIL BY ID");
};

// PUT EMAIL
const putEmail = async (req, res) => {
  let emailId = req.params.id;
  let updatedEmail = await Email.replaceOne({ _id: emailId }, req.body);
  console.log("PUT EMAIL", updatedEmail);
};

// PATCH EMAIL
const patchEmail = async (req, res) => {
  let emailId = req.params.id;
  let updatedEmail = await Email.findOneAndUpdate({ _id: emailId }, req.body);
  console.log("GET UPDATE EMAIL", updatedEmail);
};

module.exports = {
  patchEmail,
  putEmail,
  getEmailById,
  postEmail,
  deleteEmail,
  getAllEmail,
};
