const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./routers/ApiRoute"));
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
