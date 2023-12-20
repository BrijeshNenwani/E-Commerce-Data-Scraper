const ytsr = require("ytsr");
const { setContinueSearch, getContinuedSearch } = require("./continueSearch");

const getSearch = async (req, res) => {
  try {
    const { query } = await req.query;
    console.log(query);

    if (!query) return;
    const firstResultBatch = await ytsr(
      // `https://www.youtube.com/results?search_query=${query}`,
      query,
      { pages: 1, limit: 20, gl: "IN" }
    );

    console.log("\n\n successfully searched for query:", query);
    const { items, continuation } = firstResultBatch;
    const continueString = setContinueSearch(continuation);
    await res.status(200).json({ items, continueString });
  } catch (err) {
    console.error("ERROR:\n\n", err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

const nextSearch = async (req, res) => {
  try {
    const { next } = req.params;
    if (!next) return;
    const result = await getContinuedSearch(next);
    await res.status(200).json(result);
  } catch (err) {
    console.error("ERROR: \n\n", err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = { getSearch, nextSearch };
