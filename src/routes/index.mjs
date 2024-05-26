import { Router } from "express";
import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";

const rootRouter = Router();
rootRouter.use(usersRouter);
rootRouter.use(productsRouter);
export default rootRouter;
