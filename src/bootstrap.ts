import { CronService, SubscriptionHistoryService } from "./services";

export async function bootstrapCrons() {
  const subscriptionHistoryService = new SubscriptionHistoryService();
  const cronService = new CronService(subscriptionHistoryService);
  cronService.init();
}
