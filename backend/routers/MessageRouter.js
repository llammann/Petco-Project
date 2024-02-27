const express = require("express");
const router = express.Router();
const MessageControllers = require("./../controllers/MessageController");

router.get("/messages", MessageControllers.getAllMessages);
router.delete("/messages/:id", MessageControllers.deleteMessage);
router.post("/messages", MessageControllers.postMessage);
router.get("/messages/:id", MessageControllers.getMessageById);
router.put("/messages/:id", MessageControllers.putMessage);
router.patch("/messages/:id", MessageControllers.patchMessage);

module.exports = router;
