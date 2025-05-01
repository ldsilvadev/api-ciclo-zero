import { fastify } from "fastify";
import { env } from "@/env";
import cors from "@fastify/cors";
import { routes } from "./routes";

const server = fastify();

server.register(cors, {
  origin: "*",
});

server.register(routes)

server.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
