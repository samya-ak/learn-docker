const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
//can use ip address instead of mongo while connecting, since ip may change whenever we run a container, it is not used
//directly. Instead, service name is used
const connectWithRetry = () => {
  mongoose
    // here mongo is the name of the service which is resolved to its respective ip address
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("successfully coneected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("<h2>Alright! working</h2>");
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listenning on port: ${port}`));
