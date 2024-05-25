import express from "express";
import { loggingMiddleware } from "./utils/middlewares.mjs";
import { default as userRouter } from "./routes/users.mjs";
import { default as productRouter } from "./routes/products.mjs";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(loggingMiddleware);
app.use(userRouter);
app.use(productRouter);
app.get("/", (request, response) => {
  response.status(201).send({ msg: "hello" });
});

app.listen(port, () => {
  console.log(`Runiing on Port ${port}`);
});
