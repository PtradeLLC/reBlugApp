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
    "/dashboard",
    "/agency",
    "/testdynamo",
    "/influenzas",
    "/api/webhooks/userAccount",
    "/marketplace",
    "/api/chat_bot",
    "/api/contact",
    "/api/emailfiles/react-email",
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
    "/component/EmailTemplate.html",
    "/component/Cart.html",
    "/SideEmail.html",
    "/SideElem",
    "/sign-up/sso-callback",
    "/sign-in/sso-callback"
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
