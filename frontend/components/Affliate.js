import Image from "next/image";

const benefits = [
  "Immediate payout",
  "Recurring revenue",
  "Set your own hours",
  "Free to Join",
  "Work from anywhere",
  "No Tier Limit",
  "50% Referral fee"
];

export default function Affiliate({ openModal, setOpenModal }) {
  return (
    <div className="sm:py-16">
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-5 xl:gap-x-20 xl:px-20">
            <Image
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
              src="/images/affiliate.png"
              alt=""
              width={400}
              height={400}
            />
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Affiliate Spotlight
              </h2>
              <p className="mt-6 text-lg leading-8 text-black">
                It&apos;s easy to earn on ForgedMart and you don&apos;t have to
                wait for your affiliate payout like you do with other programs
                that typically pay out on the first or middle of the month. With
                ForgedMart affiliate program, you can refer your friends and get
                paid on the same day they sign up - Thanks to our partnership
                with Stripe.
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-black sm:grid-cols-2"
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-x-3">
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex">
                <button
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  Join program<span aria-hidden="true">&rarr;</span>
                </button>
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
