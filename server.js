const express = require("express");
const bodyParser = require("body-parser");
const redisClient = require("./redis-client");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send(
    "POST /redis\n\tbody: {key:key, value:value}\n\nGET /store/:redis"
  );
});

app.post("/redis", async (req, res) => {
  try {
    const { key, value } = req.body;
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.status(201).send("Added successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/redis/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.json(JSON.parse(rawData));
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
