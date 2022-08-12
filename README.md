# 13-Object-Relational-Mapping-ORM-E-Commerce-Back-End

## Description

Express.js API to use Sequelize to interact with a MySQL database. Internet retail, also known as e-commerce, is the largest sector of the electronics industry, generating an estimated $29 trillion in 2019. E-commerce platforms like Shopify and WooCommerce provide a suite of services to businesses of all sizes

## User story:

AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

## User setup:

Run in command line in the following order from the Develop folder:
mysql:

-   mysql -u root -p
-   _enter your password_
-   SOURCE db/schema.sql;

node:

-   npm install
-   npm run seed
-   npm run start

Api call routes:
Categories:

1. PUT http://localhost:3001/api/categories/1
   {
   "category_name": "Food"
   }

2. POST http://localhost:3001/api/categories
   {
   "id": 12,
   "category_name": "Video Games"
   }
3. DELETE http://localhost:3001/api/categories/12
4. GET http://localhost:3001/api/categories
5. GET http://localhost:3001/api/categories/1

Products:

1. PUT http://localhost:3001/api/products/1
   {
   "id": 1,
   "product_name": "T-Shirt",
   "price": 15,
   "stock": 14,
   "tagIds": [2]
   }
2. POST http://localhost:3001/api/products
   {
   "id": 10,
   "product_name": "Cat shirt",
   "price": 15,
   "stock": 14,
   "tagIds": [3]
   }
3. DELETE http://localhost:3001/api/products/2
4. GET http://localhost:3001/api/products
5. GET http://localhost:3001/api/products/1

Tags:

1. PUT http://localhost:3001/api/tags/1
   {
   "tag_name": "rock music love"
   }

2. POST http://localhost:3001/api/tags
   {
   "id": 13,
   "tag_name": "TEST"
   }
3. DELETE http://localhost:3001/api/tags/4
4. GET http://localhost:3001/api/tags
5. GET http://localhost:3001/api/tags/2

## Screenshots:

![update product](develop/assets/Update%20product.PNG)

## Links:

Walkthrough video: https://drive.google.com/file/d/1uNv92MwrmgO_6hytEXPpILtW-WbCxZYo/view
GitHub: https://github.com/NessJade96/13-Object-Relational-Mapping-ORM-E-Commerce-Back-End

## Commit notes:

1. Copied the starter code and set up the readme.

2. Went through all the files to read and understand what I have to do. Input the values (sequelize) into the models files. Set up and seeded the server - checking this on MySQL workbench.

3. Went through and populated the code into the api files, most of this code is just copy and paste - I have not updated them to work inside each api file.

4. Got the Categories api route working, insomnia requests are functioning (get, post, put, delete).

5. The products api route working, insomnia requests are functioning (get, post, put, delete).

6. The tags api route working, insomnia requests are functioning (get, post, put, delete). Added in the user starter directions and api routes in README. Finally, linked the image and walkthrough video. Thanks :)
