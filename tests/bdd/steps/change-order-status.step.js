const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('PREPARATION', () => {
    this.newStatus = 'PREPARATION';
});

When('Order status is RECEIVED', () => {
    this.currentStatus = 'RECEIVED';
});

When('Order status is PREPARATION', () => {
    this.currentStatus = 'PREPARATION';
});

Then('Should update order status to {string}', (expectedAnswer) => {
    assert.strictEqual(this.newStatus, expectedAnswer);
});

Then('Should show an error message {string}', (expectedAnswer) => {
    assert.strictEqual(this.newStatus, expectedAnswer);
});
