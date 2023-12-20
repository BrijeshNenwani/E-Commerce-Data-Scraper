const router = require("express").Router();
const { getSearch, nextSearch } = require("../controllers/search/search");

router.get("/", getSearch);
router.get("/continue/:next", nextSearch);
module.exports = router;
