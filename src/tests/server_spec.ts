import { User, UserStore } from "../models/user";
import { Product, ProductStore } from "../models/product";
import { Order, OrderStore } from "../models/order";
import app from "../server";
import request from "supertest";

//Stores
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

//Test objects
const testUser: User = {
  firstName: "TestUserOne",
  lastName: "Test",
  password: "testpassword",
};

const testProduct: Product = {
  name: "Test Product",
  price: 12,
};

const testOrder: Order = {
  user_id: "1",
  status: "testable",
};

describe("Check definitions", () => {
  //Tests for definitions
  it("should have a user index method", () => {
    expect(userStore.index).toBeDefined();
  });

  it("should have a user show method", () => {
    expect(userStore.show).toBeDefined();
  });

  it("should have a user create method", () => {
    expect(userStore.create).toBeDefined();
  });

  it("should have a product index method", () => {
    expect(productStore.index).toBeDefined();
  });

  it("should have a product show method", () => {
    expect(productStore.show).toBeDefined();
  });

  it("should have a product create method", () => {
    expect(productStore.create).toBeDefined();
  });

  it("should have a order index method", () => {
    expect(orderStore.index).toBeDefined();
  });

  it("should have a order show method", () => {
    expect(orderStore.show).toBeDefined();
  });

  it("should have a order create method", () => {
    expect(orderStore.create).toBeDefined();
  });

  it("should have a orders by user method", () => {
    expect(orderStore.ordersByUser).toBeDefined();
  });
});

describe("User Model functionality", () => {
  //Setup database with before/after
  //Create Testuser

  beforeAll(async () => {
    await userStore.create(testUser);
  });

  //Test INDEX route
  it("index method should return a list of users", async () => {
    const result = await userStore.index();
    expect(result).toBeTruthy;
  });

  //Test SHOW route and if CREATE route worked in beforeAll
  it("create method should have created a new user", async () => {
    const result = await userStore.show("1");
    expect(result.id).toEqual(1);
  });
});

//Test Product Routes
describe("Product Model functionality", () => {
  //Tests for functionality
  //CREATE test product

  beforeAll(async () => {
    await productStore.create(testProduct);
  });

  //Test INDEX route
  it("index method should return a list of products", async () => {
    const result = await productStore.index();
    expect(result).toBeTruthy;
  });

  //Test SHOW route and if CREATE route worked in beforeAll
  it("show method should show a certain product", async () => {
    const result = await productStore.show("1");
    expect(result.id).toEqual(1);
  });
});

describe("Order Model functionality", () => {
  //Tests for functionality
  //CREATE test order

  beforeAll(async () => {
    await productStore.create(testProduct);
    await userStore.create(testUser);
    await orderStore.create(testOrder);
  });

  //Test INDEX route
  it("index method should return a list of orders", async () => {
    const result = await orderStore.index();
    expect(result).toBeTruthy;
  });

  //Test SHOW route and if CREATE route worked in beforeAll
  it("show method should return one order", async () => {
    const result = await orderStore.show("1");
    expect(result).toEqual({
      id: 1,
      user_id: "1",
      status: "testable",
    });
  });

  //Test if Product was added
  it("should have inserted a product into the order", async () => {
    const result = await orderStore.addProduct({
      quantity: 10,
      order_id: "1",
      product_id: "1",
    });
    expect(result).toEqual({
      id: 1,
      quantity: 10,
      order_id: "1",
      product_id: "1",
    });
  });
});

//TEST ENDPOINTS
describe("Endpoint tests", () => {
  it("server should run", async () => {
    request(app).get("/").expect(200);
  });

  it("should recieve a 200 when accessing the product index route", async () => {
    request(app).get("/products").expect(200);
  });

  it("should recieve a 200 when accessing product id 1", async () => {
    request(app).get("/products/1").expect(200);
  });

  it("should recieve a 401 when creating product without token", async () => {
    request(app)
      .post("/products")
      .send({
        name: "failure",
        price: "10",
      })
      .expect(401);
  });

  it("should recieve a 200 when accessing order index route", async () => {
    request(app).get("/orders").expect(200);
  });

  it("should recieve a 200 when accessing order index route", async () => {
    request(app).get("/orders/1").expect(200);
  });

  it("should recieve a 401 when creating order without token", async () => {
    request(app)
      .post("/order")
      .send({
        user_id: "1",
        quantity: "10",
      })
      .expect(401);
  });

  it("should recieve a 401 when adding product to order without token", async () => {
    request(app)
      .post("/order/1/product")
      .send({
        quantity: "10",
        productId: "1",
      })
      .expect(401);
  });

  it("should recieve a 401 when accessing /users without token", async () => {
    request(app).get("/users").expect(401);
  });

  it("should recieve a 200 when accessing product id 1", async () => {
    request(app).get("/users/1").expect(401);
  });
});
