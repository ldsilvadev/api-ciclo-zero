import { SubscriptionService } from "@/services";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateSubscription, GetByUserParams, DeleteSubscription, GetByIdParams } from "./types";
import {
  UpdateSubscriptionParams,
  UpdateSubscriptionResponse,
} from "@/services/subscription/types";

const subscriptionService = new SubscriptionService();

export default class SubscriptionController {
  async createSubscription(
    request: FastifyRequest<{ Body: CreateSubscription }>,
    reply: FastifyReply
  ) {
    const subscription = request.body;

    const response = await subscriptionService.createSubscription(subscription);

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }

  async getByUserId(
    request: FastifyRequest<{ Params: GetByUserParams }>,
    reply: FastifyReply
  ) {
    const { user_id } = request.params;

    const response = await subscriptionService.GetByUserId(user_id);

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }

  async getById(request: FastifyRequest<{Params: GetByIdParams}>, reply: FastifyReply) {
    const { id } = request.params;

    const response = await subscriptionService.getById(id);

    if(!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }

  async updateSubscription(
    request: FastifyRequest<{
      Body: UpdateSubscriptionParams;
      Params: Pick<UpdateSubscriptionResponse, "id">;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const fieldsToUpdate = request.body;

    const response = await subscriptionService.updateSubscription(
      id,
      fieldsToUpdate
    );

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }

  async delete(
    request: FastifyRequest<{ Params: DeleteSubscription }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const response = await subscriptionService.deleteSubscription(id);

    if (!response.success) {
      return reply.status(400).send({ errors: response.error.issues });
    }

    return reply.status(201).send(response);
  }
}
