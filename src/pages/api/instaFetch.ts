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

    await page.goto("https://www.instagram.com");
    const inArray = Array.from(await page.$$("input"));
    const loginBtn = await page.$("button");

    //login section
    await inArray[0].focus();
    await inArray[0].type(usrId, { delay: 100 });
    await inArray[1].focus();
    await inArray[1].type(pass, { delay: 150 });
    await loginBtn?.click({ delay: 100 });

    const newPage = await browser.newPage();

    switch (req.method) {
        case "GET": {
            res.status(200).json({ message: "href" });
        }

        default: {
            res.status(200).json({ message: `Triggered default case` });
        }
    }
}
