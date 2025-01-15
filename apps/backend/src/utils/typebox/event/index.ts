import { Type } from "@sinclair/typebox";

const SessionPeerSchema = Type.Object({
  session: Type.Integer({
    description: "The id of the session.",
  }),
});

const EventSchemas = {
  "/register": SessionPeerSchema,
};

type Event = keyof typeof EventSchemas;

const EventSchema = Type.Union(
  Object.entries(EventSchemas).map(([event, schema]) =>
    Type.Object({
      metadata: schema,
      event: Type.Literal(event),
    }),
  ),
);

export type { Event };
export { EventSchema, EventSchemas };
