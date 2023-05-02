import { NextApiRequest, NextApiResponse } from "next";
import { Arapey } from "next/font/google";
import puppeteer, { Browser, JSHandle, Page } from "puppeteer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const usrId = process.env.NEXT_PUBLIC_INSTAGRAM_USR
        ? process.env.NEXT_PUBLIC_INSTAGRAM_USR
        : "";
    const pass = process.env.NEXT_PUBLIC_INSTAGRAM_PASS
        ? process.env.NEXT_PUBLIC_INSTAGRAM_PASS
        : "";

    const query = req.body;

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://instagram.com", { waitUntil: "networkidle0" });

    const inArray = await page.$$("._aa4b");
    const loginBtn = await page.$("._acan");
    await inArray[0].click();
    await page.keyboard.type(usrId, { delay: 100 });
    await inArray[1].click();
    await page.keyboard.type(pass, { delay: 150 });
    await loginBtn?.click();

    await page.waitForNavigation();

    if ((await page.$("._acan")) !== null) {
        await (await page.$(".x1i10hfl"))?.click();
    }

    await page.goto(`https://instagram.com/explore/tags/${query.tag}`, {
        waitUntil: "networkidle0",
    });

    const sr = await page.evaluate(() => {
        const srcArray: string[] = [];
        const images = document.querySelectorAll(".x5yr21d");
        images.forEach((image) => {
            const imSrc = image.getAttribute("src");
            if (imSrc !== null) {
                srcArray.push(imSrc);
            }
        });

        return srcArray;
    });

    switch (req.method) {
        case "POST": {
            res.status(200).json({ imageArray: sr });
        }

        default: {
            res.status(200).json({ message: `Triggered default case` });
        }
    }
}
