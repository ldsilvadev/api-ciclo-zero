import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "@/services";
import { AuthParams } from "./types";

const authService = new AuthService();

export default class AuthController {
  async auth(
    request: FastifyRequest<{ Body: AuthParams }>,
    reply: FastifyReply,
  ) {
    const userData = request.body;

    const response = await authService.auth(userData);

    if(!response.success) {
      return reply.status(400).send(response);
    }

    return reply.status(200).send(response);
  }
}
