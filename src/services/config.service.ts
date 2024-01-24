import { env } from '@env';
import { injectable } from "tsyringe";

@injectable()
export class ConfigService {
    constructor() {
    }

    reload = async () => {
        await env.populateAllEnvs();

        return { message: 'Envs have been updated' };
    }
}
