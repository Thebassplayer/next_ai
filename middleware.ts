export { default } from "next-auth/middleware";

export const config = { matcher: ["/:path*"] };

// import { withAuth } from "next-auth/middleware";
// import { getServerSession } from "next-auth/next";
// import { NextResponse, NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export default withAuth(
//   function middleware(request: NextRequest) {
//     console.log("middleware");
//     console.log(request.url);
//     console.log(request.method);
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         if (!token) {
//           console.log("not authorized");
//           return false;
//         }
//         console.log("authorized");
//         return true;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: ["/api/:path*", "/user/:path*"],
// };
