import { SMSOptions, SMSResult, SMSService } from '@interfaces/sms.service';
import { Twilio } from 'twilio';

export class TwilioSMSService implements SMSService {
    constructor(
        private readonly accountSid: string,
        private readonly authToken: string,
        private readonly fromNumber: string
    ) {
        this.accountSid = accountSid;
        this.authToken = authToken;
        this.fromNumber = fromNumber;
    }

    async send(options: SMSOptions): Promise<SMSResult> {
        const client = new Twilio(this.accountSid, this.authToken);

        const result = await client.messages.create({
            body: options.content,
            from: this.fromNumber,
            to: options.customerNumber,
        });

        return { result };
    }
}
