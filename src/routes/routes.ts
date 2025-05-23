import { FastifyInstance } from "fastify";
import { userRoutes } from "./user";
import { authRoutes } from "./auth";
import { SubscriptionRoutes } from "./subscription";
import { SubscriptionHistoryRoutes } from "./subscription-history";

export default async function routes(app: FastifyInstance) {
  app.register(userRoutes);
  app.register(authRoutes);
  app.register(SubscriptionRoutes);
  app.register(SubscriptionHistoryRoutes);
}
