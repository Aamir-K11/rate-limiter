const BUCKET = {};

module.exports.rateLimit = function (req, res, next) {
  const LIMIT = 3; //Token limit

  //Initialize the bucket
  if (BUCKET[req.ip] === undefined) {
    BUCKET[req.ip] = LIMIT;
    setInterval(() => {
      Object.keys(BUCKET).forEach((key) => {
        if (BUCKET[key] >= LIMIT) {
          return;
        }
        BUCKET[key] = BUCKET[key] + 1;
      });
    }, 1000);
  }

  if (BUCKET[req.ip] == 0) {
    return res.status(429).send("Too many requests");
  }

  BUCKET[req.ip] = BUCKET[req.ip] - 1;
  next();
};
