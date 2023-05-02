import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    setTimeout(() => {
        console.log("lol");
    }, 5000);

    switch (req.method) {
        case "POST": {
            res.status(200).json({ imageArray: ["h", "o", "l", "a"] });
        }

        default: {
            res.status(200).json({ message: `Triggered default case` });
        }
    }
}
