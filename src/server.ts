import { fastify } from "fastify";
import { env } from "@/env";
import cors from "@fastify/cors";
import { routes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import { bootstrapCrons } from "./bootstrap";

const server = fastify();

server.register(cors, {
  origin: "*",
});

server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

server.register(routes);

server.listen({ port: env.PORT }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
  await bootstrapCrons();
});
