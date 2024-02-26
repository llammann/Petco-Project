const express = require("express");
const router = express.Router();
const PetControllers = require("./../controllers/PetController");
router.get("/pets", PetControllers.getAllPet);
router.delete("/pets/:id", PetControllers.deletePet);
router.post("/pets", PetControllers.postPet);
router.get("/pets/:id", PetControllers.getPetById);
router.put("/pets/:id", PetControllers.putPet);
router.patch("/pets/:id", PetControllers.patchPet);

module.exports = router;
