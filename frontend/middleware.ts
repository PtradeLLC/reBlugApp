import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/freetrials",
    "/contact",
    "/agency",
    "/influencers",
    "/marketplace",
    "/api/chat_bot",
    "/api/trendToolsAI",
    "/api/aiTools",
    "/testTrial",
    "/api/chat/route",
    "/tools",
    "/email",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
