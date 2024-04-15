const express = require("express");
const nhanvien = require("../controllers/nhanvien.controller");

const router = express.Router();

router.route("/nhanvien/")
    .get(nhanvien.findAll)
    .post(nhanvien.create)

router.route("/nhanvien/:id")
    .get(nhanvien.findOne)
    .put(nhanvien.update)
    .delete(nhanvien.delete);

module.exports = router;
