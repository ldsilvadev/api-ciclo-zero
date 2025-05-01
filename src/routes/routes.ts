import { FastifyInstance } from "fastify";
import { userRoutes } from "./user";

export default async function routes(app: FastifyInstance) {
    app.register(userRoutes);
}