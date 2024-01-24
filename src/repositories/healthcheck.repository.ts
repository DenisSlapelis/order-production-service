import { database } from '@database';
import { injectable } from "tsyringe";

@injectable()
export class HealthCheckRepository {
    constructor() {
    }

    checkDatabase = async () => {
        await database.authenticate();

        return true;
    }
}
