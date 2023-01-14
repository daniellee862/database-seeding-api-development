const db = require("./");
const format = require("pg-format");

// THIS DATA IS PASSED INTO THE PARAMS IN THE RUN SEED FILE.
// const shops = require("./data/dev-data/shops");
// const treasures = require("./data/dev-data/treasures");

const createShopReference = require("../utils/utils");

const seed = ({ shopData, treasureData }) => {
  return (
    db
      .query(`DROP TABLE IF EXISTS treasures;`) // First step drop the tables if they exist
      .then(() => {
        // drop any existing shops table
        return db.query(`DROP TABLE IF EXISTS shops;`);
      })
      // Second step Create the tables
      .then(() => {
        return db.query(`CREATE TABLE shops (       
		shop_id SERIAL PRIMARY KEY,
		shop_name VARCHAR(40) NOT NULL,
		owner VARCHAR(30) NOT NULL,
		slogan TEXT 
	);`);
      })
      .then(() => {
        return db.query(
          `CREATE TABLE treasures (
			treasure_id SERIAL PRIMARY KEY,
			treasure_name VARCHAR(50) NOT NULL,
			colour TEXT NOT NULL,
			age INT NOT NULL,
			cost_at_auction REAL NOT NULL,
			shop_id INT NOT NULL,
			FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
			);`
        );
      })

      //Step three get data and format it if it needs to be
      .then(() => {
        const formattedShopData = shopData.map((shop) => {
          const { shop_name, owner, slogan } = shop;
          return [shop_name, owner, slogan];
        });
        //Step four do the sql statement
        const sqlString = `
      INSERT INTO shops (
        shop_name, owner, slogan
      ) 
      VALUES 
      %L
    RETURNING *
      `;
        // Step five use pg format to join the sql string and the data in to one big sql statement
        const insertShopData = format(sqlString, formattedShopData);
        //Step six return db suery using our complete sql string above
        return db.query(insertShopData);
      })
      .then((result) => {
        const shopReference = createShopReference(result.rows);

        const formattedTreasureData = treasureData.map((treasure) => {
          const { treasure_name, colour, age, cost_at_auction, shop } =
            treasure;
          const correctShopId = shopReference[shop];
          return [treasure_name, colour, age, cost_at_auction, correctShopId];
        });
        const sqlInsertTreasures = `
      INSERT INTO treasures (
        treasure_name, colour, age, cost_at_auction, shop_id
      )
      VALUES
      %L
      `;
        const completeTreasuresTable = format(
          sqlInsertTreasures,
          formattedTreasureData
        );
        return db.query(completeTreasuresTable);
      })
  );
};

module.exports = seed;
