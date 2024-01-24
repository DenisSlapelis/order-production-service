const fs = require('fs');

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: './src/config/database/order_production_db.sqlite',
        logging: console.log,
    },
    test: {
        dialect: 'sqlite',
        storage: './src/config/database/order_production_db.sqlite',
        logging: console.log,
    },
};
