import express from "express";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import { validationSchemas } from "./validationSchemas.mjs";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};
const randomMiddleWare = (request, response, next) => {
  console.log(" I am a middle specific to a route.");
  next();
};
const resolveIndexByUserId = (request, response, next) => {
  let { id } = request.params;
  id = parseInt(id);
  if (isNaN(id)) return response.sendStatus(400);
  const index = users.findIndex((el) => el.id === id);
  if (index === -1) return response.sendStatus(404);
  request.index = index;
  next();
};
// app.use(loggingMiddleware);
app.get("/", (request, response) => {
  response.status(201).send({ msg: "hello" });
});
const users = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "adam", displayName: "Adam" },
];

app.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must Be at least 3-10 Characters"),

  (request, response) => {
    const result = validationResult(request);
    console.log("result = ", result);
    const { filter, value } = request.query;
    if (!filter && !value) response.send(users);
    else if (filter && value) {
      const filteredUser = users.filter((el) => el[filter].includes(value));
      response.send(filteredUser);
    } else response.send(users);
  }
);
app.post("/api/users", checkSchema(validationSchemas), (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response.status(400).send({ errors: result.array() });
  }
  const data = matchedData(request);
  console.log("data=", data);
  const { username, displayName } = request.body;
  const newUser = { id: users.length + 1, username, displayName };
  users.push(newUser);
  return resposne.status(201).send(newUser);
});
app.get("/api/products", (request, response) => [
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]),
]);
app.get("/api/users/:id", (request, response) => {
  const { id } = request.params;
  if (isNaN(parseInt(id))) {
    return response.status(400).send({ msg: "Bad Request. Invalid ID." });
  }
  const user = users.find((el) => el.id === parseInt(id));
  if (!user) return response.sendStatus(404);
  response.send(user);
});

app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, index } = request;
  users[index] = body;
  response.status(200).send(users[index]);
});

app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { index } = request;
  users[index] = { ...users[index], ...request.body };
  response.status(200).send(users[index]);
});
app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { index } = request;
  const temp = users[index];
  users.splice(index, 1);
  response.status(200).send(temp);
});

app.listen(port, () => {
  console.log(`Runiing on Port ${port}`);
});
