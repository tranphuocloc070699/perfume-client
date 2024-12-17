import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserService from "@/services/modules/user.service";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const userService = new UserService();
          const response = await userService.login(credentials);
          console.log({ response });
          const user = response.data.data;
          if (response.status === 200 && user) {
            return {
              id: String(user.id),
              email: user.email,
              name: user.name,
              accessToken: response.data.accessToken
            };

          } else {
            console.error("Invalid credentials or missing data");
            return null;
          }

        } catch (error) {
          console.error("Authorize Error:", error.message || error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });
      // if (user) {
      //   token.accessToken = user.accessToken;
      //   token.id = user.id;
      // }
      return token;
    },
    async session({ session, token }) {
      console.log({ session, token });
      // session.user = {
      //   id: token.id,
      //   email: session.user?.email,
      //   accessToken: token.accessToken,
      // };
      return session;
    }
  }
  // pages: {
  //   signIn: "/auth/login"
  // }
};

export default NextAuth(authOptions);
