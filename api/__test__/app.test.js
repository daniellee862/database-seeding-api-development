//IMPORT SUPERTEST TO TEST EXPRESS ENDPOINT
const request = require("supertest");
//IMPORT OUR EXPRESS APP
const app = require("../app.js");
//IMPORT CONTROLLERS
const getAllTreasures = require("../controllers");
//IMPORT MODELS
const fetchAllTreasures = require("../models");
//DB CONNECTION
const database = require("../../db/index");
// INDEX; SHOPS.JS + TREASURES.JS
const testData = require("../../db/data/test-data/index");
//SEED FUNCTION TO RE-SEED BEFORE EACH TEST
const seed = require("../../db/seed");

//JEST HOOK TO RESEED
beforeEach(() => {
  return seed(testData);
});

//JEST HOOK TO END CONNECTION
afterAll(() => {
  return database.end();
});

//DESCRIBE BLOCK FOR TESTS
describe("END TO END: /api/treasures", () => {
  test("test endpoint replies with 200", () => {
    //REQUEST, GET, AND FIRST EXPECT = SUPERTEST
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.req.method).toBe("GET");
      });
  });

  test("It should sort treasures by treasure_name", () => {
    return request(app)
      .get("/api/treasures?sort=treasure_name")
      .then((res) => {
        const treasures = res.body.treasures;
        expect(res.statusCode).toBe(200);
        expect(treasures[0].treasure_name).toBe("treasure-a");
        expect(treasures[treasures.length - 1].treasure_name).toBe(
          "treasure-z"
        );
      });
  });

  test("It should sort treasures by age", () => {
    return request(app)
      .get("/api/treasures?sort=age")
      .then((res) => {
        const treasures = res.body.treasures;
        expect(res.statusCode).toBe(200);
        expect(treasures[0].age).toBe(1);
        expect(treasures[treasures.length - 1].age).toBe(10865);
      });
  });

  test("It should accept orderquery and be able to order acsending or descending", () => {
    return request(app)
      .get("/api/treasures?sort=age&order=desc")
      .then((res) => {
        const treasures = res.body.treasures;
        expect(res.statusCode).toBe(200);
        expect(treasures[0].age).toBe(10865);
        expect(treasures[treasures.length - 1].age).toBe(1);
      });
  });

  test("returns 404 error message on bad request / incorrect query", () => {
    return request(app)
      .get("/api/treasures?sort=apple&order=desc")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Bad Request");
      });
  });

  test("It should accept orderquery and be able to order acsending or descending", () => {
    return request(app)
      .get("/api/treasures?sort=age&order=desc")
      .then((res) => {
        const treasures = res.body.treasures;
        expect(res.statusCode).toBe(200);
        expect(treasures[0].age).toBe(10865);
        expect(treasures[treasures.length - 1].age).toBe(1);
      });
  });

  //   test("It should accept colorquery and be able to filter according query", () => {
  //     return request(app)
  //       .get("/api/treasures?colour=gold")
  //       .then((res) => {
  //         console.log(res.body.treasures);
  //         const treasures = res.body.treasures;
  //         expect(res.statusCode).toBe(200);
  //       });
  //   });
});

describe("MODEL TESTS: fetchAllTreasures", () => {
  test("should return all treasures sorted by age ascending as default", () => {
    return fetchAllTreasures().then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("treasure_id");
      expect(result[0]).toHaveProperty("treasure_name");
      expect(result[0]).toHaveProperty("colour");
      expect(result[0]).toHaveProperty("age");
      expect(result[0]).toHaveProperty("cost_at_auction");
      expect(result[0]).toHaveProperty("shop_name");
      expect(result[0].age).toBeLessThanOrEqual(result[result.length - 1].age);
    });
  });
});
