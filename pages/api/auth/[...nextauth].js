// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import TwitterProvider from "next-auth/providers/twitter"
// export default NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // TwitterProvider({
//     //   clientId: process.env.TWITTER_ID,
//     //   clientSecret: process.env.TWITTER_SECRET,
//     // }),
//     // ...add more providers here
//   ],
//   secret: process.env.JWT_SECRET,
//   callbacks: {
//     async session({ session, token }) {
//       session.user.tag = session.user.name
//       .split(" ")
//       .join("")
//       .toLocaleLowerCase();

//       session.user.uid = token.sub;
//       return session;
//     }
//   } 
// })



import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
})