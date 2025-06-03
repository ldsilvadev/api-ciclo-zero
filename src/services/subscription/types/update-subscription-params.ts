export default interface UpdateSubscriptionParams {
  name?: string;
  price?: number;
  billing_cycle?: "MONTHLY" | "YEARLY";
  due_date?: Date;
  installment?: number;
  auto_detected?: boolean;
}
