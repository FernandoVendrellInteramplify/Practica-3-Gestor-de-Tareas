import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { getUsuarioEmail } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {

                const pass = credentials.password?.toString();
                const mail = credentials.email?.toString();

                if (!pass || !mail) {return null;}

                const user = getUsuarioEmail(mail);

                if (!user) {return null;}

                const validPassword = await bcryptjs.compare(pass, user.password_hash);

                if (!validPassword) {return null;}

                return {
                    id: user.id.toString(),
                    name: user.nombre,
                    email: user.email,
                };
            },
        }),
    ],

    pages: {signIn: "/login",},

    session: {strategy: "jwt",},

    callbacks: {
        async jwt({ token, user }) {
            if (user) {token.id = user.id;}
            return token;
        },
        async session({ session, token }) {
            if (session.user) {session.user.id = token.id as string;}
            return session;
        },
    },
});