const express = require("express");
const router = express.Router();
const NewsControllers = require("./../controllers/NewsController");

router.get("/news", NewsControllers.getAllNews);
router.delete("/news/:id", NewsControllers.deleteNews);
router.post("/news", NewsControllers.postNews);
router.get("/news/:id", NewsControllers.getNewsById);
router.put("/news/:id", NewsControllers.putNews);
router.patch("/news/:id", NewsControllers.patchNews);

module.exports = router;
