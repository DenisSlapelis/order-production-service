import { TwilioSMSService } from '@services/twilio-sms.service';
import { SendSMSUseCase } from '@useCases/send-sms.use-case';
import { env } from '@env';

export const makeSMSService = () => {
    const accountSid = env.getValue('ACCOUNT_SID');
    const authToken = env.getValue('AUTH_TOKEN');
    const fromNumber = env.getValue('FROM_NUMBER');

    return new TwilioSMSService(accountSid, authToken, fromNumber);
};

export const makeSendSMSUseCase = () => {
    const SMSService = makeSMSService();

    return new SendSMSUseCase(SMSService);
}
