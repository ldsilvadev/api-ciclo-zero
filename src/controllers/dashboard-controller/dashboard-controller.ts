import { DashboardService } from "@/services";
import { FastifyReply, FastifyRequest } from "fastify";

const dashboardService = new DashboardService();

export default class DashboardController {
  async getDashboardInfos(
    request: FastifyRequest<{ Params: { user_id: string } }>,
    reply: FastifyReply,
  ) {
    const { user_id } = request.params;

    const response = await dashboardService.getDashboardInfos(user_id);

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(200).send(response);
  }
}
