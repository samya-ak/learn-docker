const express = require("express");
const mongoose = require("mongoose");
const app = express();

//can use ip address instead of mongo while connecting, since ip may change whenever we run a container, it is not used
//directly. Instead, service name is used
mongoose
  // here mongo is the name of the service which is resolved to its respective ip address
  .connect("mongodb://root:samyak@mongo:27017/?authSource=admin")
  .then(() => console.log("successfully coneected to DB"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Alright! working</h2>");
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listenning on port: ${port}`));
