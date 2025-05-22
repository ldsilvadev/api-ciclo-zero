export default interface CreateSubscription {
    user_id: string
    name: string
    price: string
    billing_cycle: "monthly" | "yearly"
    due_date: Date
    installment: number
    auto_detected: boolean
    created_at: Date
}
