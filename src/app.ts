import "reflect-metadata";
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import createConnection from './database';
import router from "./routes";
import { AppError } from "./errors/AppError";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({message: err.message,});
    }
    
    return res.status(500).json({
        status: "Error",
        message: `Ìnternal server error ${err.message}`
    });
});

export default app;