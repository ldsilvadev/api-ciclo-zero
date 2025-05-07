export default interface CreateSubscription {
    user_id: string
    name: string
    price: string
    billing_cycle: "monthly" | "yearly"
    next_renewal_date: Date
    auto_detected: boolean
    created_at: Date
}