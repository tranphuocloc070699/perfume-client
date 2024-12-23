import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import UserService from "@/services/modules/user.service";
import { ISignUpLoginForm } from "@/types/user/user.interface";
import {
  EmailAlreadyExists,
  EmailNotFoundError,
  EmailOrPasswordIncorrect,
  FetchError,
  UnknownError
} from "@/lib/errors/credentials-error";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials, req) => {
        const type = credentials?.type;
        try {
          const userService = new UserService();
          let response = null;
          if (type === "login") {
            response = await userService.login(credentials as ISignUpLoginForm);
          } else if (type === "signup") {
            response = await userService.signup(credentials as ISignUpLoginForm);
          } else if (type === "authenticate") {
            response = await userService.authenticate(req?.headers.get("cookie"));
          }

          const setCookieHeader = response?.headers?.get("Set-Cookie");

          if (response?.body?.status === 400 && type === "login") {
            throw new EmailOrPasswordIncorrect();
          }
          if (response?.body?.status === 400 && type === "signup") {
            throw new EmailAlreadyExists();
          }
          if (response?.body?.status === 404) {
            throw new EmailNotFoundError();
          }
          if (response?.body?.status === 500 && response?.body?.errors === "Token expired") {
            await userService.logout(req?.headers.get("cookie"));
            await signOut({ redirect: true });
          }
          const user = response?.body?.data?.data;
          if (response?.body?.status === 200 && user) {
            return {
              id: String(user.id),
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken: response?.body?.data.accessToken,
              ...(setCookieHeader ? { refreshToken: setCookieHeader } : {})
            };
          } else {
            return null;
          }
        } catch (error) {
          if (typeof error?.message === "string" && error.message.includes("fetch failed")) throw new FetchError();
          if (error instanceof EmailOrPasswordIncorrect) throw new EmailOrPasswordIncorrect();
          if (error instanceof EmailNotFoundError) throw new EmailNotFoundError();
          if (error instanceof EmailAlreadyExists) throw new EmailAlreadyExists();
          throw new UnknownError();
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any)?.accessToken;
        token.refreshToken = (user as any)?.refreshToken;
        token.role = (user as any)?.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).role = token.role;
      (session.user as any).accessToken = token.accessToken;
      return session;
    }
  }
});





