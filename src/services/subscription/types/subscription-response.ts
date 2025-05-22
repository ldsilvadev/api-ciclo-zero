export default interface SubscriptionResponse {
  user_id: string;
  name: string;
  price: number;
  billing_cycle: "monthly" | "yearly";
  due_date: Date;
  installment: number | null;
  auto_detected: boolean;
  created_at: Date;
}
