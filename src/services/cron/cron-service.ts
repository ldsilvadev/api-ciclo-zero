import cron from "node-cron";
import SubscriptionHistoryService from "../subscription_history";

export default class CronService {
  constructor(
    private readonly subscriptionHistoryService: SubscriptionHistoryService,
  ) {}

  init() {
    cron.schedule("* * * * *", async () => {
      console.log("Executing cron job");
      try {
        await this.subscriptionHistoryService.autoDetectedSubscription();
      } catch (error) {
        console.error("Error executing cron job:", error);
      }
    });
  }
}
