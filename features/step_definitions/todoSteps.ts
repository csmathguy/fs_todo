import { Given, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import * as puppeteer from 'puppeteer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

Given('I open the homepage', async function () {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  // Adjust the URL if needed (the React dev server is running on port 3000)
  await page.goto('http://localhost:3000');
});

Then('I should see the text {string}', async function (expectedText: string) {
  const content = await page.content();
  assert.ok(
    content.includes(expectedText),
    `Expected page content to include "${expectedText}", but got: ${content}`
  );
  await browser.close();
});
