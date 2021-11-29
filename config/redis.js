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
mutation:{
     createnote: async (parent, { key, value }, { client }) => {
    try {
      await client.set(key, value);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
}
}