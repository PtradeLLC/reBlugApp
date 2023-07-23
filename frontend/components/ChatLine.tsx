import clsx from "clsx";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <span className="font-large text-xxl text-gray-900">
          {/* <Image
            src="/images/owl.jpg"
            alt="profile-image"
            width={50}
            height={30}
          /> */}
        </span>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }
  const formatteMessage = convertNewLines(content);

  return (
    <div
      className={
        role != "assistant" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <BalancerWrapper>
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <p className="font-large text-xxl text-gray-900">
              <a href="#" className="hover:underline">
                <span className="flex items-center">
                  {role == "assistant" ? (
                    <Image
                      src="/images/Marttwainxyz.png"
                      className="mx-3"
                      alt="brand logo"
                      width={50}
                      height={30}
                    />
                  ) : (
                    <Image
                      src="/images/rabbit.png"
                      className="rounded-full pr-2 mt-1"
                      alt="brand logo"
                      width={50}
                      height={30}
                    />
                  )}
                  {role == "assistant" ? "Forged AI" : "You"}
                </span>
              </a>
            </p>
            <p
              className={clsx(
                "text ",
                role == "assistant" ? "font-semibold font- " : "text-gray-400"
              )}
            >
              {formatteMessage}
            </p>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}
