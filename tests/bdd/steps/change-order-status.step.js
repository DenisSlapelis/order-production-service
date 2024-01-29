const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const axios = require('axios');

const HOST = 'http://localhost:8000';
const ORDERS_BASE_URL = `${HOST}/api/v1/orders`;

const getToken = async () => {
    const {
        data: { token },
    } = await axios.post(`${HOST}/login`);

    return `Bearer ${token}`;
};

const create = async (orderId) => {
    const data = {
        orderId,
    };

    await axios.post(ORDERS_BASE_URL, data, {
        headers: {
            'Authorization': await getToken(),
        },
    });
};

const updateStatus = async (orderId, status) => {
    const data = {
        orderId,
        status,
    };

    const result = await axios.put(ORDERS_BASE_URL, data, {
        headers: {
            'Authorization': await getToken(),
        },
    });

    return result.data;
};

Given('PREPARATION', () => {
    this.newStatus = 'PREPARATION';
});

When('Order status is RECEIVED', async () => {
    await create(1);
});

Then('Should update order status to {string}', async (expectedAnswer) => {
    const result = await updateStatus(1, 'PREPARATION');

    assert.strictEqual(result?.status, expectedAnswer);
});

When('Order status is PREPARATION', async () => {
    const options = {
        headers: {
            'Authorization': await getToken(),
        },
    };

    await axios.post(
        ORDERS_BASE_URL,
        {
            orderId: 2,
        },
        options
    );

    const body = {
        orderId: 2,
        status: 'PREPARATION',
    };

    await axios.put(ORDERS_BASE_URL, body, options);
});

Then('Should show an error message {string}', async (expectedAnswer) => {
    assert.throws(async function () {
        updateStatus(2, 'PREPARATION');
    }, Error);
});
