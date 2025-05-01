export default interface CreateUser {
    name: string;
    email: string;
    password_hash: string;
    plan: "free" | "premium";
    created_at: Date;
}