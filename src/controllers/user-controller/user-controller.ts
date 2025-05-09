import { UserService } from "@/services";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser } from "./types";

const userService = new UserService();

export default class UserController {
  async createUser(
    request: FastifyRequest<{ Body: CreateUser }>,
    reply: FastifyReply
  ) {
    const user = request.body;

    const response = await userService.createUser(user);

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }

  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    const response = await userService.getUsers();

    return reply.status(201).send(response);
  }
}
