import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  /*try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split("")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401).json("Access denied invalid token!");
    return;
  }
  */

  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const products_route = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
};

export default products_route;
