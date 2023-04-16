import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import { useRouter } from "next/router";

const AuthScreen = () => {
    const router = useRouter();
    const uiConfig = {
        signInSuccessUrl: "/",
    };

    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center">
            <main className="py-32 shadow-lg px-5 rounded-lg font-raleway flex flex-col gap-4 justify-center items-center mt-64 w-[90%] max-w-[360px]">
                <h2 className="text-2xl font-bold">Sign In</h2>
                <button
                    onClick={googleLogin}
                    className="text-base shadow-md px-5 py-3 flex flex-row gap-2 click:shadow-none"
                >
                    <FcGoogle className="text-2xl" />
                    Sign in with Google
                </button>
            </main>
        </div>
    );
};

export default AuthScreen;
