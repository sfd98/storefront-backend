# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' [GET]   OK!
- Show '/products:id' [id]  OK!
- Create '/products' [POST][token required] OK!
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Table Schema Products
```
Products
id              integer PRIMARY KEY
name            VARCHAR(100)
price           integer
```

#### Users
- Index '/users' [GET] [token required]         OK!
- Show '/users:id' [GET] [token required]       OK!
- Create N '/users' [POST] [token required]     OK!

#### Table Schema Users
```
Users
id              integer PRIMARY KEY
firstName       VARCHAR(100)
lastName        VARCHAR(100)
password_digest VARCHAR
```

#### Orders
- Current Order by user (args: user id) '/orders:user_id' [token required] [GET] OK!
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

#### Table Schema Orders
```
Orders
id              integer PRIMARY KEY
user_id         integer FOREIGN KEY REFERENCES users.id
status          VARCHAR(20)
```

### Table Schema Orders_Products
```
Orders_Products
id              integer PRIMARY KEY
quantity        integer
order_id        bigint FOREIGN KEY REFERENCES orders.id
product_id      bigint FOREIGN KEY REFERENCES products.id         
```