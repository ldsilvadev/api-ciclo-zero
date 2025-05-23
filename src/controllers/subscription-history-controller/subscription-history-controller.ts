import { FastifyReply, FastifyRequest } from "fastify";
import { SubscriptionHistoryService } from "@/services";
import { CreateSubscriptionHistoryParams } from "./types";

const subscriptionHistoryService = new SubscriptionHistoryService();

export default class SubscriptionHistoryController {
  async createSubscriptionHistory(
    request: FastifyRequest<{ Body: CreateSubscriptionHistoryParams }>,
    reply: FastifyReply,
  ) {
    const subscription = request.body;

    const response =
      await subscriptionHistoryService.createSubscriptionHistory(subscription);

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }

  async getByUserId(
    request: FastifyRequest<{ Params: { user_id: string } }>,
    reply: FastifyReply,
  ) {
    const { user_id } = request.params;

    const response = await subscriptionHistoryService.getByUserId(user_id);

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }

  async getTotal(
    request: FastifyRequest<{ Params: { user_id: string } }>,
    reply: FastifyReply,
  ) {
    const { user_id } = request.params;

    const response = await subscriptionHistoryService.getTotal(user_id);

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }
}
