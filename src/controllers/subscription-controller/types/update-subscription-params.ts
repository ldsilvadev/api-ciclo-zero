export default interface UpdateSubscriptionParams {
    name?: string;
    price?: number;
    billing_cycle?: "monthly" | "yearly";
    due_date?: Date;
    installment?: number;
    auto_detected?: boolean;
  }
