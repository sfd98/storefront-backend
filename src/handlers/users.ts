import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split("")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401).json("Access denied invalid token!");
    return;
  }

  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split("")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401).json("Access denied invalid token!");
    return;
  }

  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

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
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
};

export default users_route;
