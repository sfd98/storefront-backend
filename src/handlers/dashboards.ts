import express, {Request, Response} from 'express';

import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const ordersbyusers = async (_req: Request, res: Response) => {
    const users = await dashboard.OrdersByUser();
    res.json(users);
};

const dashboard_route = (app: express.Application) => {
    app.get('/orders-by-user', ordersbyusers);
}

export default dashboard_route;