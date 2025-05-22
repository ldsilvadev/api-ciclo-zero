export default interface CreateUser {
  name: string;
  email: string;
  password: string;
  plan: "free" | "premium";
  created_at: Date;
}
