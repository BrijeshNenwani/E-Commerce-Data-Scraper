const router = require("express").Router();
const { suggestVideo } = require("../controllers/suggestion.js");

router.get("/:page", suggestVideo);
module.exports = router;
