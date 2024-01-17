import Image from "next/image";
import Link from "next/link"

const clickRate = [
  { 'Timing and Frequency': " Launch and send unintrusive AI-Powered Email marketing campaign using Conversational Email Tool." },
  { 'Poor Subject Lines': " Conversation Email Tool scans web and social media for recipients' latest posts, dynamically crafting subject lines." },
  { 'Irrelevant Content': " Segment and Identify quality leads based on keywords and connected social metrics." },
  { 'Unresponsive Emails': " Deploy chatbot to answer questions, provide support with Conversational Email Tool." },
  { 'List Hygiene Issues': "  Regularly clean email list by removing inactive subscribers. Encourage engagement through re-engagement campaigns." },
  { 'Poor Email Design': " Our tool comes with beautifully designed email templates developed to balance text and images." },
];
const openRate = [
  { 'Emails Labeled as Spam': " Our Tool is configured to avoid spammy practices, using a clear sender name, authenticating  emails, and adhere to email marketing best practices." },
  { 'Lack of Personalization': " Conversation Email Tool personalizes emails by using the recipient's name, engages recipients based on public social data, referencing social media posts." },
  { 'Misaligned Audience Targeting': " Email list based on demographics, behavior, or preferences conducted by various LLM models. Send targeted and relevant content to improve engagement." },
  { 'Low-Quality Email Content:': " The tool creates high-quality, relevant, and valuable content that aligns with the expectations of your recipients." },
  { 'Device Compatibility Issues': " The tool comes with responsive design templates to ensure that your emails look good and function well on desktops, tablets, and mobile devices." },
  { 'Weak Source': " Import your contact list, combine with ours or let AI generate a list of emails based on your input that are most qualified to respond to your campaign." },
];

export default function Affiliate({ openModal, setOpenModal }) {
  return (
    <div className="sm:py-16">
      <div className="relative isolate">
        <div className="mx-auto max-w-[85rem] sm:px-6">
          <div className="mx-auto flex flex-col sm:gap-8 px-6 py-10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:py-5 xl:gap-x-10 xl:px-10">
            <div className="h-14">
              <Image
                className="h-50 w-full flex-none rounded-2xl object-cover lg:aspect-square lg:max-w-sm"
                src="/images/emailmar.jpg"
                alt="tool-image"
                width={400}
                height={50}
              />
            </div>
            <div className="w-full gap-8 mt-56 lg:mt-0">
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Tool: Email Marketing
              </h2>
              <p className="mt-6 text-lg leading-8 text-black">
                <span className="underline"><Link target="_blank" href="https://www.mailerlite.com/blog/compare-your-email-performance-metrics-industry-benchmarks">According to MailerLite's Email marketing benchmarks</Link></span>, the Average Open and Click Rates for email marketing are 41.31% and 3.01%, respectively.
                So much for a communication tool, right?<br /> Our analysis suggests there is room for improvement in these metrics. Despite the estimated email marketing revenue reaching almost $12.33 billion in 2024, the average/click rate ratios are not particularly impressive. These are what we propose:
              </p>
              <p className="mt-3 mb-1 font-semibold">Separating Concerns for Click / Open  Rates</p>
              <p className="mt-2 font-medium italic">Addressing Key Click Rate Concerns:</p>
              <ul
                role="list"
                className="mt-4 px-2 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 list-disc text-black sm:grid-cols-2"
              >
                {clickRate.map((benefitObject, index) => {
                  const key = Object.keys(benefitObject)[0];
                  const value = benefitObject[key];

                  // Check if the key and value are valid (not empty)
                  if (key && value) {
                    return (
                      <li key={index}>
                        <span className="font-semibold">Issue:</span> {key}<br /><span className="font-semibold">Our Solution:</span>{value}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>

              <p className="mt-4 font-medium italic ">Addressing Key Open Rate Concerns:</p>
              <ul
                role="list"
                className="mt-4 px-2 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 list-disc text-black sm:grid-cols-2"
              >
                {openRate.map((benefitObject, index) => {
                  const key = Object.keys(benefitObject)[0];
                  const value = benefitObject[key];

                  // Check if the key and value are valid (not empty)
                  if (key && value) {
                    return (
                      <li key={index}>
                        <span className="font-semibold">Issue:</span> {key}<br /><span className="font-semibold">Our Solution:</span>{value}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>

              <div className="mt-10 flex">
                <Link
                  href={'/login'}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  Even better, Give it a Spin<span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1318/752] w-[82.375rem] flex-none opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
