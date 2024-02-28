const express = require("express");
const app = express();
const PORT = 3000;
const rateLimit = require("./rateLimit");

app.use(rateLimit.rateLimit);

app.get("/limited", (req, res, next) => {
  res.send("Limited! Don't overuse me!");
});

app.get("/unlimited", (req, res) => {
  res.send("Unlimited! Let's Go!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
