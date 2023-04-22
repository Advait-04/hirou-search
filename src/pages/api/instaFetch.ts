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

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://instagram.com", { waitUntil: "networkidle0" });

    const pageContent = await page.content();

    const inArray = await page.$$("._aa4b");
    const loginBtn = await page.$("._acan");
    await inArray[0].click();
    await page.keyboard.type(usrId, { delay: 100 });
    await inArray[1].click();
    await page.keyboard.type(pass, { delay: 150 });
    await loginBtn?.click();

    await page.waitForNavigation();

    const navButtons = await page.$$(".x9f619");
    await navButtons[0].click();

    switch (req.method) {
        case "GET": {
            res.status(200).json({ message: "test" });
        }

        default: {
            res.status(200).json({ message: `Triggered default case` });
        }
    }
}
