import { database } from '@database';
import { injectable } from "tsyringe";

@injectable()
export class HealthCheckRepository {
    checkDatabase = async () => {
        await database.authenticate();

        return true;
    }
}
