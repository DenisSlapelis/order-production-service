import dotenv from 'dotenv';

dotenv.config({ path: `${process.env.ENV_FILE_PATH ?? '.env'}` });

const getEnvironmentVariable = (environmentVariableName: string) => {
    const environmentVariable = process.env[environmentVariableName];

    if (!environmentVariable) return '';

    return environmentVariable;
};

export const localEnvs = {
    // AWS ENVS
    AWS_ACCESS_KEY_ID: getEnvironmentVariable('AWS_ACCESS_KEY_ID'),
    AWS_REGION: getEnvironmentVariable('AWS_REGION'),
    AWS_SECRET_ACCESS_KEY: getEnvironmentVariable('AWS_SECRET_ACCESS_KEY'),

    // APPLICATION ENVS
    APPLICATION_ENVIRONMENT: getEnvironmentVariable('APPLICATION_ENVIRONMENT') ?? 'dev',
    APPLICATION_NAME: getEnvironmentVariable('APPLICATION_NAME') ?? 'rural-producer-service',
    DEBUG: getEnvironmentVariable('DEBUG') ?? 'false',
    NODE_ENV: getEnvironmentVariable('NODE_ENV') ?? 'development',
    PORT: Number(getEnvironmentVariable('PORT') ?? 8000),
    CORS_ORIGIN: getEnvironmentVariable('NODE_ENV'),

    // SMS ENVS
    ACCOUNT_SID: getEnvironmentVariable('ACCOUNT_SID'),
    AUTH_TOKEN: getEnvironmentVariable('AUTH_TOKEN'),
    FROM_NUMBER: getEnvironmentVariable('FROM_NUMBER'),

    // AMQP CONFIGS
    AMQP_HOST: getEnvironmentVariable('AMQP_HOST'),
    AMQP_USER: getEnvironmentVariable('AMQP_USER'),
    AMQP_PASS: getEnvironmentVariable('AMQP_PASS'),
    NEW_ORDER_QUEUE: getEnvironmentVariable('NEW_ORDER_QUEUE'),
    NEW_ORDER_ERROR_QUEUE: `${getEnvironmentVariable('NEW_ORDER_QUEUE')}-errors`,
    CHANGE_STATUS_QUEUE: getEnvironmentVariable('CHANGE_STATUS_QUEUE'),
    CHANGE_STATUS_ERROR_QUEUE: `${getEnvironmentVariable('CHANGE_STATUS_QUEUE')}-errors`,
};
