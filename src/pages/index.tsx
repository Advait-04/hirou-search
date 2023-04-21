import Image from "next/image";
import { Inter } from "next/font/google";
import { auth, db } from "../../firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { BiSearch } from "react-icons/bi";

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
            <nav className="banner h-32 sticky flex justify-center">
                <form
                    className="w-[85%] h-[100%] p-5 flex justify-center items-center"
                    onSubmit={searchQuery}
                >
                    <div className="w-[100%] h-14 flex justify-start items-center bg-white rounded-sm">
                        <button
                            type="button"
                            className="w-16 flex justify-center text-2xl"
                            onClick={searchQuery}
                        >
                            <BiSearch />
                        </button>
                        <input
                            type="text"
                            className="h-[100%] w-[100%] rounded-md py-3 px-5 font-montserrat text-xl opacity-0.5"
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            required
                        />
                    </div>
                </form>
            </nav>
            <main className="flex flex-col items-center mt-5 font-montserrat">
                <div className="flex gap-3">
                    <button type="button">Home</button>
                    <div className="bg-black w-[1px]"></div>
                    <button type="button">Profile</button>
                </div>
                <div className="w-[30%] h-[1px] bg-black mt-3"></div>
                <div className="content mt-6 w-[80%] bg-slate-700 h-64"></div>
            </main>
        </div>
    );
}
