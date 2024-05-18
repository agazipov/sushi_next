import NextAuth, { User, AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialProvider from "next-auth/providers/credentials";
import { users } from "./users";
import { checkPassword } from "@/lib/identification";

export const authConfig: AuthOptions = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        CredentialProvider({
            credentials: {
                name: { label: "name", type: "name", requierd: true },
                password: { label: "password", type: "password", requierd: true }
            },
            async authorize(credentials) {
                if (!credentials?.name || !credentials.password) return null;
                console.log('huita');

                const user = await prisma.user.findUnique({
                    where: { name: credentials?.name },
                    select: {
                      id: true,
                      name: true,
                      passwordHash: true,
                      salt: true
                    },
                  });
                  if (user && user.passwordHash === await checkPassword(credentials.password, user.salt)) {
                    return user;
                  } else {
                    return null;
                  }
            }
        })
    ],
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }