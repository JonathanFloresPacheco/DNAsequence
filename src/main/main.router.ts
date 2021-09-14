import { Router } from "express";
import { dnasequenceRouter } from "../services/routers/dnasequence.router";

export const mainRouter = Router();
mainRouter

// dna
.use('/dna', dnasequenceRouter)
;
