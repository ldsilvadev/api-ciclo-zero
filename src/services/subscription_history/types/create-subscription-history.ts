export default interface CreateSubscriptionHistory {
  user_id: string;
  subscription_id: string;
  due_date: Date;
  billing_cycle: "MONTHLY" | "YEARLY";
  price: number;
  created_at: Date;
}
