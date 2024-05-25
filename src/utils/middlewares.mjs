import { users } from "./constants.mjs";

export const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};
export const randomMiddleWare = (request, response, next) => {
  console.log(" I am a middle specific to a route.");
  next();
};
export const resolveIndexByUserId = (request, response, next) => {
  let { id } = request.params;
  id = parseInt(id);
  if (isNaN(id)) return response.sendStatus(400);
  const index = users.findIndex((el) => el.id === id);
  if (index === -1) return response.sendStatus(404);
  request.index = index;
  next();
};
