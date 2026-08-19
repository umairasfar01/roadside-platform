import { authkitProxy } from "@workos-inc/authkit-nextjs";

// Only the customer application area requires a signed-in session for now.
// The marketing landing page, auth routes, and static assets are outside
// this matcher, so the proxy never runs for them.
export default authkitProxy({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: [],
  },
});

export const config = {
  matcher: ["/customer/:path*"],
};
