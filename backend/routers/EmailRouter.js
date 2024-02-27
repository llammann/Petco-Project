const express = require("express");
const router = express.Router();
const EmailControllers = require("./../controllers/EmailController");

router.get("/emails", EmailControllers.getAllEmail);
router.delete("/emails/:id", EmailControllers.deleteEmail);
router.post("/emails", EmailControllers.postEmail);
router.get("/emails/:id", EmailControllers.getEmailById);
router.put("/emails/:id", EmailControllers.putEmail);
router.patch("/emails/:id", EmailControllers.patchEmail);

module.exports = router;
