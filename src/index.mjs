import express from "express";
import { loggingMiddleware } from "./utils/middlewares.mjs";
import rootRouter from "./routes/index.mjs";
import cookieParser from "cookie-parser";

// --------------------------------- //
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser("helloworld"));

app.use(loggingMiddleware);
app.use(rootRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

// ---------------------------------- //
app.get("/", (request, response) => {
  response.cookie("hello", "world", { maxAge: 1000 * 60, signed: true });
  response.status(201).send({ msg: "hello" });
});
