import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
}

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.params.id);
    res.json(order);
}

const orders_route = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/order:id', show);
}

export default orders_route;

