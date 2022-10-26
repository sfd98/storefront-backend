import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import jwt from "jsonwebtoken";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split("")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401).json("Access denied invalid token!");
    return;
  }

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
  const quantity: number = req.body.quantity;
  const orderId: number = req.body.orderId;
  const productId: number = req.body.productId;
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orders_route = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders/:id/product", addProduct);
};

export default orders_route;
