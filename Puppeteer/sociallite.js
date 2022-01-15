const puppeteer = require("puppeteer"); //Most functions are async or promises
const fs = require("fs/promises"); //file system

async function start() {
  const browser = await puppeteer.launch(); //Launching the browser and wait for it to complete
  const page = await browser.newPage();
  await page.setViewport({
    //Changing viewport to get full post :)
    width: 540,
    height: 960,
    deviceScaleFactor: 1,
  });
  await page.goto("https://social-lite-lfz.herokuapp.com/#login");
  await page.click(".demo-login");
  await page.waitForNavigation();
  await page.waitForSelector(".container");
  await page.waitForTimeout(2000); //Waiting for animations/images to fully load.
  await page.screenshot({ path: "social-lite.png" }); //Successfully creates the screenshot
  await page.click('.fa-comment');
  await page.waitForTimeout(800);
  await page.screenshot({ path: "social-lite-chat.png" });
  await page.click(".fa-bars");
  await page.waitForTimeout(400); //Waiting for navbar load
  await page.screenshot({ path: "social-lite-nav.png" });
  await browser.close(); //Closes the browser
}

start()
