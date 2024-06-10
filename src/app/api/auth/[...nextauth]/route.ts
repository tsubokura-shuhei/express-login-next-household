import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Tsubokura Yukiko",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const matched =
          credentials?.name === process.env.NEXT_USER_NAME &&
          credentials?.password === process.env.NEXT_USER_PASSWORD; //Idとパスワード（ID:id、パスワード:）
        if (matched) {
          return { id: "1234" };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/signin",
  // },
  session: {
    // セッションの有効期間を7日間に設定
    maxAge: 7 * 24 * 60 * 60, // 7日
    // セッションの更新頻度を1日ごとに設定
    // updateAge: 24 * 60 * 60 // 1日
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
