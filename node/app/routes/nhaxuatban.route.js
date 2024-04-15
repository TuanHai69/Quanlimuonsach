const express = require("express");
const nhaxuatban = require("../controllers/nhaxuatban.controller");

const router = express.Router();

router.route("/nxb/")
    .get(nhaxuatban.findAll)
    .post(nhaxuatban.create)
    .delete(nhaxuatban.deleteAll);

router.route("/nxb/:manxb")
    .get(nhaxuatban.findOne)
    .put(nhaxuatban.update)
    .delete(nhaxuatban.delete);

module.exports = router;
