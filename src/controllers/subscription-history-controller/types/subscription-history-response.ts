export default interface SubscriptionHistoryResponse {
  id: string;
  user_id: string;
  subscription_id: string;
  due_date: Date;
  price: number;
}
