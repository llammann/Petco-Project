const User = require("./../models/UserModel");

// GET
const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.send(allUsers);
  console.log("GET Users");
};

// DELETE
const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  console.log("DELETE User");
};

// POST
const postUser = async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  console.log("POST User");
};

// GET USER BY ID
const getUserById = async (req, res) => {
  let Userid = req.params.id;
  let findUser = await User.findOne({ _id: Userid });
  res.send(findUser);

  console.log("GET User BY ID");
};

// PUT USER
const putUser = async (req, res) => {
  let Userid = req.params.id;
  let updatedUser = await User.replaceOne({ _id: Userid }, req.body);
  console.log("PUT User", updatedUser);
};

// PATCH USER
const patchUser = async (req, res) => {
  let Userid = req.params.id;
  let updatedUser = await User.findOneAndUpdate({ _id: Userid }, req.body);
  console.log("GET UPDATE PET", updatedUser);
};

module.exports = {
  patchUser,
  putUser,
  getUserById,
  postUser,
  deleteUser,
  getAllUsers,
};
