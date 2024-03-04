export interface SMSService {
    send: (options: SMSOptions) => Promise<SMSResult>;
}

export interface SMSOptions {
    customerNumber: string;
    content: string;
}

export interface SMSResult {
    result: any;
}
