import express, { NextFunction, Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import jwt from "jsonwebtoken";

const dashboard = new DashboardQueries();

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

const ordersbyusers = async (req: Request, res: Response) => {
  const user_id = req.params.user_id
  const users = await dashboard.OrdersByUser(user_id);
  res.json(users);
};

const dashboard_route = (app: express.Application) => {
  app.get("/orders/:user_id", verifyAuthToken, ordersbyusers);
};

export default dashboard_route;
