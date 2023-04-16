import Image from "next/image";
import { Inter } from "next/font/google";
import { auth, db } from "../../firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            return;
        } else {
            router.push("/auth");
        }
    }, [user]);

    return (
        <main className="px-10">
            <h1>Hello</h1>
        </main>
    );
}
