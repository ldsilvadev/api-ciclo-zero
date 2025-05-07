export default interface GetByUserIdResponse {
    user_id: string 
    name: string 
    price: number 
    billing_cycle: "monthly" | "yearly" 
    next_renewal_date: Date 
    auto_detected: boolean 
    created_at: Date 
}