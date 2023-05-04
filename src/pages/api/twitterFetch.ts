import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const usrId = process.env.NEXT_PUBLIC_TWITTER_USR
        ? process.env.NEXT_PUBLIC_TWITTER_USR
        : "";
    const pass = process.env.NEXT_PUBLIC_TWITTER_PASS
        ? process.env.NEXT_PUBLIC_TWITTER_PASS
        : "";

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://twitter.com/i/flow/login", {
        waitUntil: "networkidle0",
    });

    const usrInput = await page.$("input");
    await usrInput?.click();

    await page.keyboard.type(usrId, { delay: 100 });

    await page.keyboard.press("Enter");

    await page.waitForNetworkIdle();

    const passInput = await page.$$("input");

    await passInput[1].click();

    await page.keyboard.type(pass, { delay: 100 });

    const loginBtn = await page.$(".r-qvutc0");

    await page.keyboard.press("Enter");

    // await page.keyboard.press("Enter");

    await page.waitForNavigation();

    await page.goto(
        `https://twitter.com/search?q=%23${req.body.tag}&src=typed_query&f=image`,
        {
            waitUntil: "networkidle0",
        }
    );

    const imgArray = await page.evaluate(() => {
        const srcArray: string[] = [];
        const articles = document.querySelectorAll(".r-417010");

        return articles;
    });

    await page.close();

    switch (req.method) {
        case "POST": {
            res.status(200).json({ imageArray: "imgArray" });
        }

        default: {
            res.status(200).json({ message: `Triggered default case` });
        }
    }
}
