import signInWithGoogle from "../firebase/login";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "components/button/Button";
import { FIREBASE_CREDENTIAL } from "common/constants";

export default function Login(): JSX.Element {
    // const router = useRouter();
    const [isLoggedIn, setLogin] = useState(
        typeof window !== "undefined"
            ? localStorage.getItem(FIREBASE_CREDENTIAL) !== null
            : false,
    );

    const onLogin = async () => {
        const loginResult = await signInWithGoogle();
        if (loginResult) setLogin(true);
    };

    if (isLoggedIn) {
        // router.push('/admin-portal');
        console.log("LOGGED IN!");
    }

    return (
        // TODO: Fix styling
        <div style={{ padding: "500px" }}>
            <Button style={{ padding: "40%" }} onClick={onLogin}>
                Login to portal
            </Button>
        </div>
    );
}
