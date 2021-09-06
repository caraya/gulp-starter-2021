const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(devices['iPad Pro']);
  await page.goto('https://rivendellweb.net', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'full.png', fullPage: true });
  await browser.close();

})();
