const Redis = require("ioredis");

const redis = new Redis({ host: "localhost", port: 6380 });

const setRedisObject = async (key, value) => {
  const result = await redis.setex(key, 1800, JSON.stringify(value));
  return result === "OK";
};

const getRedisObject = async (key) => {
  const result = await redis.get(key);
  return JSON.parse(result);
};

const delRedisValue = async (key) => {
  redis.del(key);
};
module.exports = { setRedisObject, getRedisObject, delRedisValue };
