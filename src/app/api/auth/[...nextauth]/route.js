import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("Together-ever");
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // 🔥 এখানে role-সহ ইউজার রিটার্ন করো
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user", // যদি role না থাকে default "user"
        };
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },

  callbacks: {
    // JWT তে role রাখো
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // role এখানে সেট করো
      }
      return token;
    },

    // Session-এ role অ্যাড করো
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role; // এখন session.user.role পাওয়া যাবে
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
