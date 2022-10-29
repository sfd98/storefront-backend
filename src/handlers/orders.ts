import express, { NextFunction, Request, Response } from "express";
import { Order, OrderStore, ProductInOrder } from "../models/order";
import jwt from "jsonwebtoken";

const store = new OrderStore();

//Verify Function
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token === "" || token === undefined) {
      throw "No or wrong token";
    }
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    );
    next();
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {}
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const newProduct = await store.create(order);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const productInOrder: ProductInOrder = {
      quantity: req.body.quantity,
      order_id: req.params.id,
      product_id: req.body.productId,
    };
    const orderAddedProduct = await store.addProduct(productInOrder);
    res.json(orderAddedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const ordersbyuser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const users = await store.ordersByUser(user_id);
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orders_route = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.get("/ordersbyuser/:user_id", verifyAuthToken, ordersbyuser);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/product", verifyAuthToken, addProduct);
};

export default orders_route;
