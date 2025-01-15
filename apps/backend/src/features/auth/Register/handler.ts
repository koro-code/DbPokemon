import { Static } from "@sinclair/typebox";

import { dispatch, MyRoute, MySessionSchema } from "../../../fastify";
import { Hook } from "../../hook";
import { Server } from "../../server";
import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const session = await fastify.prisma.session.create({
      data: {
        ip: request.body.ip,
        agent: request.body.agent,
      },
      select: {
        id: true,
      },
    });

    const payload: Static<typeof MySessionSchema> = {
      session: session.id,
      claims: [Hook.Sse.Claim, Server.Config.Claim],
    };

    const token = await response.jwtSign(payload);

    response.header(
      "Cache-Control",
      `public, max-age=${fastify.config.JWT_EXPIRY}`,
    );

    await dispatch({
      event: "/register",
      publisher: fastify.zeromq.publisher,
      params: {
        target: `session:all`,
        metadata: {
          session: session.id,
        },
      },
    });

    return await response.send({
      token,
      session: session.id,
    });
  };
