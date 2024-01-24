export class OrderStatus {
    private status: string;
    private static readonly VALID_STAUTS = ['RECEIVED', 'PREPARATION', 'READY', 'FINISHED'];

    private constructor(status: string) {
        this.status = status;
    }

    static create(status: string): OrderStatus {
        this.validate(status);

        return new OrderStatus(status);
    }

    public get value(): string {
        return this.status;
    }

    static validate(status) {
        if (!OrderStatus.VALID_STAUTS.includes(status)) throw new Error(`Invalid order status (${status})`);
    }
}
