import { SubscriptionHistoryController } from "@/controllers";
import { FastifyInstance } from "fastify";

const subscriptionHistory = new SubscriptionHistoryController();

export default async function (server: FastifyInstance) {
  server.post(
    "/subscription_history",
    subscriptionHistory.createSubscriptionHistory,
  );
  server.get("/subscription_history/:user_id", subscriptionHistory.getByUserId);
  server.get(
    "/subscription_history/total/:user_id",
    subscriptionHistory.getTotal,
  );
}
