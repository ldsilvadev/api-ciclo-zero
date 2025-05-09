import { AuthController } from "@/controllers";
import { FastifyInstance } from "fastify";

const authController = new AuthController();

export default async function authRoutes(server: FastifyInstance) {
    server.post("/auth", authController.auth);
    server.post("/forgot-password", authController.requestPasswordReset);
    server.post("/reset-password", authController.resetPassword);
}