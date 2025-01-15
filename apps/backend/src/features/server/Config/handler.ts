import { MyRoute } from "../../../fastify";
import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  void fastify;

  return response.send({});
};
