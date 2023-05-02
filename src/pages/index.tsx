import Image from "next/image";
import { Inter } from "next/font/google";
import { auth, db } from "../../firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { BiSearch } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";

export default function Home() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (user) {
            return;
        } else {
            router.push("/auth");
        }
    }, [user]);

    const searchQuery = (event: any) => {
        event.preventDefault();
        console.log(user);
        console.log(searchValue);
    };

    return (
        <div className="w-screen min-h-screen">
            <nav className="banner sticky flex justify-center h-44">
                <form
                    className="w-[85%] h-[100%] p-5 flex justify-center items-center"
                    onSubmit={searchQuery}
                >
                    <div className="w-[100%] h-14 flex justify-start items-center bg-white rounded-sm">
                        <input
                            type="text"
                            className="h-[100%] w-[100%] rounded-md py-3 px-5 font-montserrat text-xl opacity-0.5"
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            required
                        />
                        <button
                            type="button"
                            className="w-16 flex justify-center text-2xl"
                            onClick={searchQuery}
                        >
                            <BiSearch />
                        </button>
                    </div>
                </form>
            </nav>
            <main className="flex flex-col items-center mt-5 font-montserrat">
                <Tabs isLazy colorScheme="pink">
                    <TabList>
                        <Tab>Home</Tab>
                        <Tab>Profile</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </main>
        </div>
    );
}
