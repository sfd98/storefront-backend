import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import orders_route from './handlers/orders';
import products_route from './handlers/products';
import users_route from './handlers/users';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

orders_route(app);
products_route(app);
users_route(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

export default app;