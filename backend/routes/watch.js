const router = require("express").Router();
const { getVideoData } = require("../controllers/watch");

router.get("/:videoId", getVideoData);

module.exports = router;
