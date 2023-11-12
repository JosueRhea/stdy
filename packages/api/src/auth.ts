import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, eq, schema } from "@stdy/db";
import { AuthOptions, Awaitable, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isPasswordValid } from "./shared/hash";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log({ credentials });
          const res = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, credentials?.email ?? ""));

          if(res.length <= 0) return null

          const [{ email, image, id, name, password }] = res;

          const validPassword = await isPasswordValid(
            credentials?.password ?? "",
            password
          );

          if (!validPassword) {
            return null;
          }

          return { email, image, id, name };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   async session({ session, token, user }) {
  //     return { ...session, user };
  //   },
  //   // @ts-ignore
  //   async jwt({ token, user, account, profile }) {
  //     if (typeof user !== "undefined") {
  //       // user has just signed in so the user object is populated
  //       return user;
  //     }
  //     return token;
  //   },
  // },
};
