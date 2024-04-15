const express = require("express");
const theogioimuonsach = require("../controllers/theogioimuonsach.controller");

const router = express.Router();

router.route("/theogioimuonsach/")
    .get(theogioimuonsach.findAll)
    .post(theogioimuonsach.create)
    .delete(theogioimuonsach.deleteAll);

router.route("/theogioimuonsach/:id")
    .get(theogioimuonsach.findOne)
    .put(theogioimuonsach.update)
    .delete(theogioimuonsach.delete);

module.exports = router;
