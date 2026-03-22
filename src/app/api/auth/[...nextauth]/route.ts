import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Acesso de Teste (Mock)",
            credentials: {
                username: { label: "Seu Nome", type: "text", placeholder: "Qualquer nome..." },
            },
            async authorize(credentials) {
                if (credentials?.username) {
                    return { id: "1", name: credentials.username, email: "teste@renova.com" };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                // Here we could add user id or custom claims
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
