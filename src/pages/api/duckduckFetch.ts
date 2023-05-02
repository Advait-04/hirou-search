import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { Browser } from "puppeteer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://duckduckgo.com", { waitUntil: "networkidle0" });

    const input = await page.$("input");
    const searchBtn = await page.$("#search_button_homepage");

    await input?.click();

    await page.keyboard.type(`${req.body.tag}`);

    await searchBtn?.click();

    await page.waitForNavigation();

    const imageTab = await page.$(".js-zci-link--images");

    await imageTab?.click();

    const imgArray = await page.evaluate(() => {
        const srcArray: string[] = [];
        const images = document.querySelectorAll(".tile--img__img");
        images.forEach((img) => {
            const imSrc = img.getAttribute("src");
            if (imSrc !== null) {
                srcArray.push(`https:${imSrc}`);
            }
        });

        return srcArray;
    });

    await browser.close();

    switch (req.method) {
        case "POST": {
            res.status(200).json({ imageArray: imgArray });
        }

        default: {
            res.status(200).json({ message: `Triggered default case` });
        }
    }
}
