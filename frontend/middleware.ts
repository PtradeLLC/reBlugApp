import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/freetrials",
    "/contact",
    "/agency",
    "/influenzas",
    "/marketplace",
    "/api/chat_bot",
    "/api/trendToolsAI",
    "/api/aiTools",
    "/testTrial",
    "/api/chat/route",
    "/tools",
    "/email",
    "/api/email/test-email",
    "/api/email/email-template",
    "/api/email/prospectTemplate",
    "/api/email/emailLogic",
    "/emailTest",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
