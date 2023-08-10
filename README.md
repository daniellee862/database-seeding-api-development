# Database Seeding and API Development with Node.js, PostgresSQL and Express.js 💽

## Overview 👀:

![Node.js Badge](https://img.shields.io/badge/Node.js-%E2%9A%AA%E2%9C%B2%E2%9A%AA-blue)
![PostgreSQL Badge](https://img.shields.io/badge/PostgreSQL-%F0%9F%90%98%F0%9F%94%8D%F0%9F%93%A6-blue)
![Express.js Badge](https://img.shields.io/badge/Express.js-%E2%9A%A1%F0%9F%9B%A4%EF%B8%8F%F0%9F%8C%90-blue)
![SQL Badge](https://img.shields.io/badge/SQL-%F0%9F%97%83%EF%B8%8F%F0%9F%93%8A%F0%9F%92%BE-blue)


Programmatic database seeding, API development and antique store themed database. 

## Key Project Components 📂:

- Database design and management using PostgreSQL.
- Seeding data and ensuring data relationships.
- Crafting a flexible API endpoint for antique store data.
- Implementing sorting, filtering, and error handling.
- Exploring the fascinating world of antique stores and products.

## Learning Outcomes 📚:

- Proficiency in PostgreSQL database setup and management.
- Data seeding, manipulation, and maintaining data relationships.
- Dynamic API development in Node.js for efficient data retrieval.
- Crafting SQL queries for sorting, filtering, and enhancing usability.
- Robust error handling and comprehensive testing.
- Utilizing utility functions for modular and reusable code.
- Client-centric API design with customizable query parameters.
- Collaboration and version control using Git.
- Problem-solving and troubleshooting skills for real-world challenges.
- Effective code documentation and communication practices.

### Part 1: Seeding 🌱 

- Set up database tables for "shops" and "treasures" with specific properties.
  > The `seed` script provided for you in the `package.json` will run the `seed` function with the dev data. Use the `seed` script to check your `seed` function is working as intended.
  > **Hint**: Remember that you'll need create a `.env.development` file (use the `example.env` as a template) and then run the `setup.sql` file to create the databases first
  Your first job will be complete the seed function to remove any existing treasures tables. Update the seed function accordingly.
  
- Drop existing tables and create new ones using Node.js and PostgreSQL.
  >We need a way of building a table to house our `shops` data.
  >Each shop should have a unique identifier and the following properties:

  | Property  | Type   | Required |
  | --------- | ------ | -------- |
  | shop_name | string | true     |
  | owner     | string | true     |
  | slogan    | text   | false    |

  >Then you will need to expand the `seed` function to create a `treasures` table.
  >Each treasure should have a unique identifier and the following properties:

  | Property        | Type                  | Required |
  | --------------- | --------------------- | -------- |
  | treasure_name   | string                | true     |
  | colour          | string                | true     |
  | age             | number                | true     |
  | cost_at_auction | floating point number | true     |
  | shop_id\*       | number                | true     |

  \* shop_id should reference a shop in the shops table.

  
  - Populate tables with data, maintaining data relationships.
  >updated the **seed** function in `./db/seed.js` for the insertion of data into each table using `node-postgres`.
  >maintained relationships between the data before they are inserted into the db. In the database, treasures reference the shop they belong to by the **shop_id**.
 
    
  - Ensure accurate data insertion and proper references between "shops" and "treasures."




## Part 2: Building the API 🔌

In this section, we'll cover the development of the API for querying treasure data. We'll implement various features and ensure thorough testing for a robust and reliable API.

### Implementing the `/api/treasures` Endpoint

We will create a GET endpoint for retrieving treasure data. This endpoint will provide a list of treasures, including their details such as name, color, age, cost, and shop name. Additionally, we'll enable sorting options based on age, cost, and name using query parameters.

#### **GET** `/api/treasures`

This endpoint retrieves treasure data and supports the following functionality:

- 📋 Responds with a list of treasures, including shop names and details.
- 🔑 Each treasure contains the following keys:
  - `treasure_id`
  - `treasure_name`
  - `colour`
  - `age`
  - `cost_at_auction`
  - **`shop_name`**

- 📅 Default sort criteria: **age**
- 🔄 Default sort order: **ascending**
  - `/api/treasures`: The first result is the youngest treasure (default).

- 🎯 Clients can customize sorting by using `age`, `cost_at_auction`, and `treasure_name` with a `sort_by` query parameter.
  - For example, `/api/treasures?sort_by=cost_at_auction` responds with a list of treasures sorted by cost, cheapest first.

- 🛡️ Input is validated to prevent **SQL injection**.

- ⬆️ Sorting order customization (ascending or descending) is allowed through the `order` query parameter.
  - For instance, `/api/treasures?order=desc` will return the oldest treasures first.

- 🎨 Color-based filtering of treasures is enabled.
  - `/api/treasures?colour=gold` responds with treasures of the gold color only.

### Testing and Validation

Comprehensive testing is emphasized throughout the development process. We ensure testing covers both expected and error scenarios. Each query and functionality is isolated and thoroughly tested. Additionally, utility functions are utilized for efficient data manipulation and organization.

By following these guidelines and best practices, we create a robust and reliable API for querying treasure data.

