import express, { NextFunction, Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();

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
const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Show Route
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Create Route
const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Authenticate Route
const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(
      user.firstName,
      user.lastName,
      user.password
    );
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json({ err });
  }
};

const users_route = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
};

export default users_route;
