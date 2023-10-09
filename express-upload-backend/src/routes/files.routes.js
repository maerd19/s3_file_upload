const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/files.controller");
const multerConfig = require("../middleware/multerConfig");

router.get("/", uploadController.getAllFiles); // Get all files
router.post("/", multerConfig, uploadController.uploadFile); // Upload a file

module.exports = router;
