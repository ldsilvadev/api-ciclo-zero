import { SubscriptionController } from "@/controllers";
import { FastifyInstance } from "fastify";

const subscriptionController = new SubscriptionController();

export default async function SubscriptionRoutes(server: FastifyInstance) {
  server.post("/subscriptions", subscriptionController.createSubscription);
  server.get("/subscriptions/:user_id", subscriptionController.getByUserId);
  server.get("/next_due/:user_id", subscriptionController.getNextDue);
  server.get("/subscription/:id", subscriptionController.getById);
  server.put("/subscriptions/:id", subscriptionController.updateSubscription);
  server.delete("/subscriptions/:id", subscriptionController.delete);
}
