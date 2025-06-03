export default interface CreateSubscription {
  user_id: string;
  name: string;
  price: number;
  billing_cycle: "MONTHLY" | "YEARLY";
  due_date: Date;
  installment: number;
  auto_detected: boolean;
  created_at: Date;
}
