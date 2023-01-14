const { forEach } = require("../db/data/dev-data/shops");

const createShopReference = (shops) => {
  const shopReference = {};
  if (shops.length === 0) return shopReference;

  shops.forEach((shop) => {
    shopReference[shop.shop_name] = shop.shop_id;
  });

  return shopReference;
};

module.exports = createShopReference;
