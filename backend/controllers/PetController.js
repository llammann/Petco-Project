const Pet = require("../models/PetModel");

// GET
const getAllPet = async (req, res) => {
  const allpets = await Pet.find({});
  res.send(allpets);
  console.log("GET PET");
};

// DELETE
const deletePet = async (req, res) => {
  const _id = req.params.id;

  await Pet.findByIdAndDelete(_id);
  console.log("DELETE PET");
};

// POST
const postPet = async (req, res) => {
  const newPet = new Pet(req.body);

  newPet.save();
  console.log("POST PET");
};

// GET PET BY ID
const getPetById = async (req, res) => {
  let Petid = req.params.id;
  let findPet = await Pet.findOne({ _id: Petid });
  res.send(findPet);

  console.log("GET PET BY ID");
};

// PUT PET
const putPet = async (req, res) => {
  let Petid = req.params.id;
  let updatedPet = await Pet.replaceOne({ _id: Petid }, req.body);
  console.log("PUT PET", updatedPet);
};

// PATCH PET
const patchPet = async (req, res) => {
  let Petid = req.params.id;
  let updatedPet = await Pet.findOneAndUpdate({ _id: Petid }, req.body);
  console.log("GET UPDATE PET", updatedPet);
};

module.exports = {
  patchPet,
  putPet,
  getPetById,
  postPet,
  deletePet,
  getAllPet,
};
