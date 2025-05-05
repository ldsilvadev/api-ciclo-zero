import { UserController } from "@/controllers";
import { FastifyInstance } from "fastify";

const userController = new UserController();

export default async function userRoutes(server: FastifyInstance) {
  server.post("/users", userController.createUser);
  server.get("/users", userController.getUsers);
}
