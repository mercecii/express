import { Router } from "express";

const productsRouter = new Router();
productsRouter.get("/api/products", (request, response) => {
  console.log(request.signedCookies);
  if (request.signedCookies.hello && request.signedCookies.hello === "world") {
    response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
  }
  return response.send({ message: "Invalid Cookie" });
});

export default productsRouter;
