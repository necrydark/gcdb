import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react"
import { usernameClient }  from "better-auth/client/plugins"

export const client = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000",
    plugins: [
        twoFactorClient({
            onTwoFactorRedirect() {
                window.location.href = "/two-factor"
            }
        }),
        usernameClient()
    ]
})



export const { signIn, signOut, signUp, useSession } = client;