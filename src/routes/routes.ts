import { FastifyInstance } from "fastify";
import { userRoutes } from "./user";
import { authRoutes } from "./auth";

export default async function routes(app: FastifyInstance) {
    app.register(userRoutes);
    app.register(authRoutes);
}