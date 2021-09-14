import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import jwt from "express-jwt";
import { mainRouter } from "./main/main.router";
export const app: Application = express();
import { JWT_SECRET_VALUE } from "../src/config/env";
require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.set('view engine', 'ejs');
app.use(cors());
app.options('*', cors());

app.use("/api",jwt({ secret: JWT_SECRET_VALUE, algorithms: ['HS256']})
.unless(
    { path: [
        '/api/dna/token'
    ]}
));
app.use("/api", mainRouter);
