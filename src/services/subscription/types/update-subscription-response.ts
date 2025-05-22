export default interface UpdateSubscriptionResponse {
  id: string,
  user_id: string;
  name: string;
  price: number;
  billing_cycle: "monthly" | "yearly";
  due_date: Date;
  installment: number | null;
  auto_detected: boolean;
}
