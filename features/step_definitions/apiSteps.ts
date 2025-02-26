import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import fetch from 'node-fetch';

let responseText: string;

When('I send a GET request to {string}', async function (endpoint: string) {
  const response = await fetch(`http://localhost:3001${endpoint}`);
  responseText = await response.text();
});

Then('the response should contain {string}', function (expectedText: string) {
  assert.ok(
    responseText.includes(expectedText),
    `Expected response to contain "${expectedText}", but got: ${responseText}`
  );
});
