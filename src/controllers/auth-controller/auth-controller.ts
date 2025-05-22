import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "@/services";
import { AuthParams } from "./types";
import { ResetPasswordParams } from "@/services/auth/types";

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

  async requestPasswordReset(request: FastifyRequest<{Body: {email: string}}>, reply: FastifyReply) {
    const {email} = request.body;

    const response = await authService.requestPasswordReset(email);

    if(!response?.success) {
      return reply.status(400).send({ errors: response.error.issues })
    }

    return reply.status(200).send(response);
  }

  async resetPassword(request: FastifyRequest<{Body: ResetPasswordParams}>, reply: FastifyReply) {
    const userData = request.body;

    const response = await authService.resetPassword(userData);

    if(!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(200).send(response);
  }
}
