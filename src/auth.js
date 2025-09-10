import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "Enter your email" },
            password: { label: "Password", type: "password" },
        },
        authorize: async ({ email, password }) => {
            console.log(email, password);

            if (typeof email !== "string") throw new CredentialsSignin({
                cause: "Email is not valid",
            });

            const user = { email, id: "123"};

            if (password !== "passcode")
                throw new CredentialsSignin({
                    cause: "Password is incorrect",
                });
            else return user;
        }
    }),
  ],
});