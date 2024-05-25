import { Router } from "express";
import { users } from "../utils/constants.mjs";
import { validationSchemas } from "../validationSchemas.mjs";
import {
  query,
  checkSchema,
  matchedData,
  validationResult,
} from "express-validator";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

router.get(
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
router.post(
  "/api/users",
  checkSchema(validationSchemas),
  (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() });
    }
    const data = matchedData(request);
    console.log("data=", data);
    const { username, displayName } = request.body;
    const newUser = { id: users.length + 1, username, displayName };
    users.push(newUser);
    return response.status(201).send(newUser);
  }
);

router.get("/api/users/:id", (request, response) => {
  const { id } = request.params;
  if (isNaN(parseInt(id))) {
    return response.status(400).send({ msg: "Bad Request. Invalid ID." });
  }
  const user = users.find((el) => el.id === parseInt(id));
  if (!user) return response.sendStatus(404);
  response.send(user);
});

router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, index } = request;
  users[index] = body;
  response.status(200).send(users[index]);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { index } = request;
  users[index] = { ...users[index], ...request.body };
  response.status(200).send(users[index]);
});
router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { index } = request;
  const temp = users[index];
  users.splice(index, 1);
  response.status(200).send(temp);
});

export default router;
