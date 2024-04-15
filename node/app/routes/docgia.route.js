const express = require("express");
const docgia = require("../controllers/docgia.controller");

const router = express.Router();

router.route("/docgia/")
    .get(docgia.findAll)
    .post(docgia.create)

router.route("/docgia/:id")
    .get(docgia.findOne)
    .put(docgia.update)
    .delete(docgia.delete);

module.exports = router;
