//IMPORT OUR DATABASE
const database = require("../db/index");

//MODEL TO QUERY DB AND SEND DATA TO CLIENT
const fetchAllTreasures = (
  sortQuery = "age",
  orderQuery = "asc",
  colourQuery
) => {
  const acceptedSortQueries = ["treasure_name", "age", "cost_at_auction"];
  const acceptedOrderQueries = ["asc", "desc"];
  const acceptedColourQueries = ["gold"];

  let queryString = `SELECT 
  treasures.treasure_id, 
  treasures.treasure_name, 
  treasures.colour, 
  treasures.age, 
  treasures.cost_at_auction, 
  shops.shop_name 
  FROM treasures 
  INNER JOIN shops ON treasures.shop_id = shops.shop_id 
 `;

  // error: column "gold" does not exist
  // if (colourQuery && acceptedColourQueries.includes(colourQuery)) {
  //   queryString += ` WHERE treasures.colour = ${colourQuery}`;
  // }

  queryString += ` ORDER BY treasures.${sortQuery} ${orderQuery};`;

  if (
    !acceptedSortQueries.includes(sortQuery) ||
    !acceptedOrderQueries.includes(orderQuery)
  ) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  return database.query(queryString).then((result) => {
    return result.rows;
  });
};

module.exports = fetchAllTreasures;
