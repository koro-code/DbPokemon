import Auth from "../features/auth";
import { FastifyInstance } from "fastify";

const { Register } = Auth;

const route = async (fastify: FastifyInstance) => {
  fastify.post("/", Register.Shorthand, Register.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/auth" });
};
