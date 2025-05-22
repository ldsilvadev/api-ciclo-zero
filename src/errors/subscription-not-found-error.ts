export default class SubscriptionNotFoundError extends Error {
    constructor() {
        super("Nenhuma assinatura encontrada");
    }
}