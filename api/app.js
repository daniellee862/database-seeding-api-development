//REQUIRE EXPRESS.JS LIBRARY/FRAMEWORK
const express = require("express");

//IMPORT CONTROLLER
const { getAllTreasures, addTreasure } = require("./controllers");

//CREATE APP WITH EXPRESS.JS INVOCATION
const app = express();

//THIS WILL ALLOW OUR EXPRESS APP TO PARSE JSON. POST / PATCH REQUESTS
app.use(express.json());

/* APP(path, callback/controller) >>> CONTROLLER(parse req + res) >>> MODEL(parse data) */

app.get("/api/treasures", getAllTreasures);

app.post("/api/treasures", addTreasure);

//EXPRESS ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next) => {
  if (error.status && error.message) {
    res.status(error.status).send({ message: error.message });
  } else {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
});

//EXPORT OUR EXPRESS APP / SERVER
module.exports = app;
