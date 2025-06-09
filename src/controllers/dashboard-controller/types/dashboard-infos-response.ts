export default interface DashboardInfosResponse {
  totalSubscriptions: number;
  monthlyExpenses: number | null;
  upcomingExpenses: number | null;
  totalExpenses: number | null;
}
