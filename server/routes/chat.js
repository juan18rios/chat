const express = require("express");
const controller = require("../controller/chat");
const router = express.Router();

router.route("/").get(controller.obtener);

module.exports = router;