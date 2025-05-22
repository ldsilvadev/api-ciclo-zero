export default interface CreateSubscription {
  user_id: string;
  name: string;
  price: number;
  billing_cycle: "monthly" | "yearly";
  due_date: Date;
  installment?: number;
  auto_detected: boolean;
  created_at: Date;
}
