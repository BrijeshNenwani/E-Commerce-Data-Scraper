
const suggestionJson = require("../data/suggestedVideos");

const suggestVideo = (req, res) => {
  try {
    const page = Number(req.params.page);
    if ((page - 1) * 20 >= suggestionJson.items.length) return;
    const itemPage = suggestionJson.items.slice((page - 1) * 20, page * 20);
    const upperLimit = suggestionJson.items.length;

    res.status(200).json({ itemPage, upperLimit });
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "Invalid request..." });
  }
};

module.exports = { suggestVideo };
