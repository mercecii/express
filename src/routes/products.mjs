import { Router } from "express";

const productsRouter = new Router();
productsRouter.get("/api/products", (request, response) => [
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]),
]);

export default productsRouter;
