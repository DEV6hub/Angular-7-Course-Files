export class PaymentInfo {
    constructor(
        public cardNumber?: number,
        public expiration?: number,
        public cvv?: number
    ) {}
}
