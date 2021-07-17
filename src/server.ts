import dotenv from 'dotenv';
dotenv.config();

import './database';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from './errors/AppError';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }
    console.log(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

// console.log("DATABASE_FILE: " + process.env.DATABASE_FILE);

app.listen(3000, () => {
    console.log('Server started on port 3000!')
})
