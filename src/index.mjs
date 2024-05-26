import express from "express";
import { loggingMiddleware } from "./utils/middlewares.mjs";
import { default as usersRouter } from "./routes/users.mjs";
import { default as productRouter } from "./routes/products.mjs";
import rootRouter from "./routes/index.mjs";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(loggingMiddleware);
app.use(rootRouter);
app.get("/", (request, response) => {
  response.status(201).send({ msg: "hello" });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
