import { OrderStatusENUM } from '@dtos/order.dto';
import { SMSService } from '@interfaces/sms.service';

export class SendSMSUseCase {
    constructor(private readonly SMSService: SMSService) {
        this.SMSService = SMSService;
    }

    send = async (status: OrderStatusENUM, name: string, number: string): Promise<void> => {
        const content = this.getContentByStatus(status, name);

        const options = {
            customerNumber: number,
            content,
        };

        await this.SMSService.send(options);
    };

    private getContentByStatus = (newStatus: OrderStatusENUM, name: string) => {
        const handleContent = {
            [OrderStatusENUM.PREPARATION]: `Olá ${name}, seu pedido já está sendo preparado!`,
            [OrderStatusENUM.READY]: `Olá ${name}, seu pedido já está pronto e pode ser retirado no caixa!`,
        };

        return handleContent[newStatus];
    };
}
