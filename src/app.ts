import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/module/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//Application Routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send("Hello world");
});

export default app;
