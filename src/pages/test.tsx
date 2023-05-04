import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Spinner, Button } from "@chakra-ui/react";

const Test = () => {
    const [imArray, setimArray] = useState([
        // "https://instagram.fcok1-1.fna.fbcdn.net/v/t51.2885-15/343015567_972126247127423_8810106022965938630_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fcok1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=8k4i9T5tXcoAX_OwR9N&edm=AGyKU4gBAAAA&ccb=7-5&ig_cache_key=MzA4NzI4Njc5ODI3OTQyNjUxNA%3D%3D.2-ccb7-5&oh=00_AfDUJ5aTrqGEoQ0ezNTvie50AiH3erNkD2GZ_27lc9vEAw&oe=644AB7F5&_nc_sid=4cb768",
        // "https://instagram.fcok1-1.fna.fbcdn.net/v/t51.2885-15/342555016_2275790542592443_7508496776356629595_n.webp?stp=dst-jpg_e35&_nc_ht=instagram.fcok1-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=gXH0k8L7CE4AX__kOwf&edm=AGyKU4gBAAAA&ccb=7-5&ig_cache_key=MzA4NzI4Njc4MzczMjk4ODAwNg%3D%3D.2-ccb7-5&oh=00_AfBrPCZrIyxwFrgjW8FmvagG74REqRLmNpzvOMYGZ9G0oA&oe=644A3455&_nc_sid=4cb768",
    ]);

    async function clickHandler() {
        // setimArray(
        //     await axios
        //         .post("/api/instaFetch", {
        //             tag: "momo",
        //         })
        //         .then((res) => res.data.imageArray)
        // );
        // const temp = await axios
        //     .post("api/twitterFetch", {
        //         tag: "momo",
        //     })
        //     .then((res) => res.data.imageArray);
        // setimArray(temp);
        // setimArray(
        //     await axios
        //         .post("/api/duckduckFetch", {
        //             tag: "mina twice",
        //         })
        //         .then((res) => res.data.imageArray)
        // );

        setimArray(
            await axios
                .post("/api/twitterFetch", {
                    tag: "minatwice",
                })
                .then((res) => res.data.imageArray)
        );
    }

    useEffect(() => {
        console.log(imArray);
    }, [imArray]);

    return (
        <div className="flex justify-center gap-5 mt-5">
            <Button colorScheme="pink" borderRadius="sm" onClick={clickHandler}>
                Blue
            </Button>
            {imArray.length !== 0 ? (
                // <imArray.map((imSrc, index) => {
                //     if (index === 0) {
                //         console.log(imSrc);
                //     }

                //     return (
                //         <Image
                //             src={imSrc}
                //             alt="img"
                //             height={100}
                //             width={100}
                //             key={index}
                //         ></Image>
                //     );
                // }>
                <h1>Hello</h1>
            ) : (
                <Spinner color="pink.500" size="xl" />
            )}
        </div>
    );
};

export default Test;
