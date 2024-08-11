
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import usersRouter from './routes/users';
import router from './routes/about'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/users', usersRouter);
app.use('/about', router);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});