import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Strapi",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials "+credentials);
        console.log(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`);
        const res = await fetch(
          `http://localhost:1337/api/auth/local`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.jwt)
          throw new Error(data.error?.message || "Login failed");

        // Return user object to store in session
        return {
          id: data.user.id,
          name: data.user.username,
          email: data.user.email,
          prenom: data.user.prenom,
          nom: data.user.nom,
          jwt: data.jwt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.prenom = user.prenom;
        token.nom = user.nom;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.prenom = token.prenom;
      session.user.nom = token.nom;
      session.jwt = token.jwt;
      return session;
    },
  },
  pages: {
    signIn: "/login", // your custom login page
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };