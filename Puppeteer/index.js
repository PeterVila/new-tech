const puppeteer = require ('puppeteer'); //Most functions are async or promises
const fs = require('fs/promises');

async function start() {
  const browser = await puppeteer.launch(); //Launching the browser and wait for it to complete
  //New page in the browser
  const page = await browser.newPage();
  await page.goto("https://learnwebcode.github.io/practice-requests/");
  // await page.screenshot({path: "amazing.png", fullPage: true}) //Successfully creates the screenshot

  //Node.js skeleton of taking an array of string and saving it to a text file
  const names = await page.evaluate(() => {
    //Client side javascript available
    const arr = Array.from(document.querySelectorAll(".info strong")); //Clientside javascript but we are in browser land not node land
    const text = arr.map((ar) => ar.textContent);
    return text;
  });

  await fs.writeFile("names.txt", names.join("\r\n")); //Return a new line

  const photos = await page.$$eval("img", (imgs) => {
    //Returns an array this time, not a nodelist
    return imgs.map((img) => img.src);
  }); //1st = css selector //2nd = function
  //Open a tab for all photos

  //What if we want to hunt for an element that doesn't exist yet? Example clicking a button.
  await page.click("#clickme"); //Looking for button
  const clickedData = await page.$eval("#data", element => element.textContent) //Single $ for single elements
  console.log(clickedData);


  //Form submission with accurate values. We want access on a new page navigation and get the text
  await page.type("#ourfield", "blue");
  await page.click("#ourform button");
  await page.waitForNavigation();
  const info = await page.$eval("#message", el => el.textContent)
  console.log(info);

  for (const photo of photos) {
    const imagepage = await page.goto(photo); //Visiting the urls for the images, so the order matters
    await fs.writeFile(photo.split("/").pop(), await imagepage.buffer()); //Gives us the final item
  }


  await browser.close(); //Closes the browser
}


//Time to automate

start()
// setInterval(start, 5000); //Not getting next page though.
