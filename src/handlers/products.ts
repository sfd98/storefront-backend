import express, { NextFunction, Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const store = new ProductStore();

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
//Index Route
const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Show Route
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Create Route
const create = async (req: Request, res: Response) => {
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
  app.post("/products", verifyAuthToken, create);
};

export default products_route;
