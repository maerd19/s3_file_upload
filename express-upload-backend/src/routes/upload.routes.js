const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const multerConfig = require("../middleware/multerConfig");

router.post("/", multerConfig, uploadController.uploadFile);

module.exports = router;
