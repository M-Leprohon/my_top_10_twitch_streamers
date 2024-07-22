import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export const config = {
    matcher: ["/word/:path*", "/notebook", "/", "/random"]
};
export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const pathname = req.url;
      console.log("pathname ", token);

      if (token) return true;
      //if (pathname === "http://localhost:3000/api/login") return true;

      return false;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
});