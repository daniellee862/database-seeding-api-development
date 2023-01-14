//IMPORT OUR MODELS
const { fetchAllTreasures, insertTreasure } = require("./models");

//CONTROLLER FUNCTION, HAS ACCESS TO REQ AND RES
const getAllTreasures = (req, res, next) => {
  //CHECK TO SEE IF QUERY IS PASSED, IF NOT REQ.QUERY WILL BE AN EMPTY OBJECT AND THE DEFAULT VALUES SET IN MODELS PARAMS WILL NOT HAVE EFFECT
  const sortQuery = req.query.sort;
  const orderQuery = req.query.order;
  const colourQuery = req.query.colour;

  //INVOKE OUR MODEL FUNCTION
  fetchAllTreasures(sortQuery, orderQuery, colourQuery)
    .then((response) => {
      res.status(200).send({ treasures: response });
    })
    .catch((error) => {
      next(error);
    });
};

const addTreasure = (req, res, next) => {
  //GET THE TREASURE TO POST
  const treasureToAdd = req.body;

  //INVOKE MODEL WITH TREASURE
  insertTreasure(treasureToAdd)
    .then((response) => {
      res.status(200).send({ treasure: response });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = { getAllTreasures, addTreasure };
