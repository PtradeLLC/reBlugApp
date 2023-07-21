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
    "/api/email-parser",
    "/testTrial",
    "/api/chat/route",
    "/tools",
    "/email",
    "/api/email/test-email",
    "/api/email/email-template",
    "/api/email/prospectTemplate",
    "/api/email/emailLogic",
    "/api/emailfiles/index.html",
    "/emailTest",
    "/images/",
    "/api/webhooks/user/chatbot-opened",
    "../../../forgedMartchatbot/utils/OpenAIStream",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
