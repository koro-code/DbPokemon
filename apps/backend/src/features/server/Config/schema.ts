import { Static, Type } from "@sinclair/typebox";

import { FastifySchema, RouteGenericInterface } from "fastify";

const Reply = Type.Object({});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["server"],
  description: "Get the service's configuration.",
  response: {
    200: Reply,
  },
};
