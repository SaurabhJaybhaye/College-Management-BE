// imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
//passer for getting data from client to serverside
app.use(express.json());
// setting Routes

// localhost API lisner
app.listen(port, () => {
  console.log("port=", port);
});
