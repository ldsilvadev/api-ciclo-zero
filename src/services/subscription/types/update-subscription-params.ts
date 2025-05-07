export default interface UpdateSubscriptionParams {
  name?: string;
  price?: number;
  billing_cycle?: "monthly" | "yearly";
  next_renewal_date?: Date;
  auto_detected?: boolean;
}
