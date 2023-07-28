import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/freetrials",
    "/creators",
    "/contact",
    "/email",
    "/agency",
    "/testdynamo",
    "/influenzas",
    "/marketplace",
    "/api/chat_bot",
    "/api/contact",
    "/api/trendToolsAI",
    "/api/aiTools",
    "/api/email-parser",
    "/testTrial",
    "/api/chat/route",
    "/tools",
    "/api/email/test-email",
    "/api/email/email-template",
    "/api/email/prospectTemplate",
    "/api/email/emailLogic",
    "/api/emailfiles",
    "/api/waitingList",
    "/emailTest",
    "/api/chatbot-opened",
    "/api/chat",
    "/component/waitingList",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
