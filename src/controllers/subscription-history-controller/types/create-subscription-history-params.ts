export default interface CreateSubscriptionHistoryParams {
  user_id: string;
  subscription_id: string;
  due_date: Date;
  price: number;
  created_at: Date;
}
