import { exit } from 'process';
import puppeteer from 'puppeteer';
const pandoc = require('node-pandoc');


(async () => {
  try {
    // get url from args
    const url = process.argv[2];
    if (!url) {
      console.error('Please specify the URL as the first argument');
      return;
    }
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
    const data = await page.evaluate(() => document.querySelector('*')!.outerHTML);

    const args = ['-f', 'html', '-t', 'markdown_github', '--lua-filter', 'web2md/src/remove-attr.lua' , '--lua-filter', 'web2md/src/remove-class.lua', '--lua-filter', 'web2md/src/remove-tables.lua']; 

    pandoc(data, args, async (err: any, result: any) => {
      if (result) {
        console.log(result);
      } else {
        console.error(err);
      }
      await browser.close();
    });
  } catch {
    exit(0);
  }
})();

