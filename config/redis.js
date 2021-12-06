const redis = require("redis");
const client = redis.createClient({
    host: '127.0.0.1',
    port: '6379'
})


module.exports = function () {

    client.on('connect', function () {
        console.log('connected with redis');
    });

    client.on('error', function (err) {
        console.log('Something went wrong ' + err);
    });
}
class Redis {
   
    redis = (req, res, next) => {
      client.set("getNotes", (err, redisdata) => {
        if (err) {
          throw err;
        } else if (redisdata) {
            client.get({ redisData: JSON.parse(redisdata) });
        } else {
          next();
        }
      });
    };
   
    redisById = (req, res, next) => {
      const notes = req.params.Id;
      console.log(notes);
      client.get(notes, (err, redisdata) => {
        if (err) {
          throw err;
        } else if (redisdata) {
          res.send({ redisData: JSON.parse(redisdata) });
        } else {
          next();
        }
      });
    };
  
   
    clearCache = () => {
      client.flushall();
      console.log("Cache is cleared!");
    };
  }
  module.exports = new Redis();