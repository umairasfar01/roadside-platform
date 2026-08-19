import { handleAuth } from "@workos-inc/authkit-nextjs";

// Must match the path configured in NEXT_PUBLIC_WORKOS_REDIRECT_URI and the
// WorkOS dashboard's redirect URI setting.
export const GET = handleAuth();
