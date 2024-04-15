const express = require("express");
const sach = require("../controllers/sach.controller");

const router = express.Router();

router.route("/sach/")
    .get(sach.findAll)
    .post(sach.create)
    .delete(sach.deleteAll);

router.route("/sach/:id")
    .get(sach.findOne)
    .put(sach.update)
    .delete(sach.delete);

module.exports = router;
