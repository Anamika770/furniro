import NextAuth, { NextAuthOptions } from "next-auth"
import { axiosApi } from "@/appUtils/axiosConfig";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 29 * 24 * 60 * 60,
        updateAge: 0
    },
    pages: {
        signIn: "/auth/login",
    },
    jwt: {
        maxAge: 29 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            id: "credentials", // 🔥 MUST
            name: "Login",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                try{

                    console.log("Credentials value is ", credentials)
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Email or Password is required');
                    }

                    const userCredentials = {
                        email: credentials.email,
                        password: credentials.password
                    };

                    console.log("userCredentials asas", userCredentials)

                    const response = await axiosApi(`/auth/user/login`, {
                        method: 'POST',
                        data: userCredentials
                    });

                    console.log("This is the value of this", response)

                    if (!response.success) {
                        const errorMsg =
                            response?.message ||
                            response?.data?.message ||
                            'Invalid email or password';
                        throw new Error(errorMsg);
                    }

                    console.log("Respose data there", response)

                    // Return the user object from the API response
                    const user = response.data.user;
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        image: user.profileImage,
                        accessToken: user.accessToken
                    };
                } catch (error:any) {
                    console.log('The authOptions response error is:', error);
                    throw new Error(error?.message || 'An error occurred while authenticating');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                };
            }
            return token;
        },
        async session({ session, token }) {
          console.log("In Auth Session data 1", session)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    accessToken: token.accessToken
                }
            };
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}