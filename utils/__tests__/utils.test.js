const createShopReference = require("../utils");

describe("shopReference()", () => {
  test("eturns an object", () => {
    expect(createShopReference([])).toEqual({});
  });
  test("returns an object with a key of shop name that has the value of shop id", () => {
    const shops = [
      {
        shop_name: "Dibbert Inc",
        shop_id: 1,
      },
    ];
    expect(createShopReference(shops)).toHaveProperty("Dibbert Inc", 1);
  });
  test("returns an object with key of shop name that has the value of shop id when passed multiple shops", () => {
    const shops = [
      {
        shop_name: "Dibbert Inc",
        shop_id: 1,
      },
      {
        shop_name: "Feeney Inc",
        shop_id: 2,
      },
      {
        shop_name: "Kshlerin, Koch and Monahan",
        shop_id: 3,
      },
    ];
    expect(createShopReference(shops)).toEqual({
      "Dibbert Inc": 1,
      "Feeney Inc": 2,
      "Kshlerin, Koch and Monahan": 3,
    });
  });
});
