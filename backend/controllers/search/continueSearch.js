const ytsr = require("ytsr");
const {
  setRedisObject,
  getRedisObject,
  delRedisValue,
} = require("../../redis-store/RedisClient");

const setContinueSearch = (continueObject) => {
  const continueString = "" + Math.random();
  futureSearch(continueString, continueObject);
  return continueString;
};

const futureSearch = async (key, continueObject, n = 3) => {
  try {
    if (n <= 0) return;
    const newResultBatch = await ytsr.continueReq(continueObject);
    if (!newResultBatch?.items) return futureSearch(key, continueObject, --n);
    setRedisObject(key, newResultBatch);
  } catch (err) {
    console.error(err);
  }
};

const getContinuedSearch = async (continueString, n = 3) => {
  const result = await getRedisObject(continueString);
  // if (!result) throw new Error("result not ready yet. ");
  const { items, continuation } = await result;
  const nextString = setContinueSearch(continuation);
  if (items) delRedisValue(continueString);
  return { items, continueString: nextString };
};
const searchAgain = async (q, n = 3) => {
  try {
    if (n <= 0) return;
    const newResultBatch = await ytsr.continueReq(q);

    // if (!newResultBatch?.items) return searchAgain(q, --n);
    const { items, continuation } = newResultBatch;
    const { continueString } = setContinueSearch(continuation);
    return { items, continueString };
  } catch (err) {
    console.log(err);
  }
};

module.exports = { setContinueSearch, getContinuedSearch };
