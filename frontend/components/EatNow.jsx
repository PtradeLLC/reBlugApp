"use client";
export default function EatNow() {
  const partners = [
    {
      name: "",
      image: "",
      url: "",
    },
  ];

  return (
    <div id="eat-now-pay-never" className="bg-[#F6F5F2] pb-24 sm:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0 mt-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-barlow-condensed">
              Pay Per Task
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              This freemium marketing tool enables us to collaborate with
              restaurants and chefs from all works of life to facilitate and
              execute precise, targeted marketing campaigns tailored to brands.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We encourage restaurants and chefs alike to partner with us and
              get high volume of orders coming from our platform members.
              Various Partnerships with brands allow us to offer our members a
              freemium service, and in return, allows restaurant and chef
              partners to receive high volume of orders, making us a premium app
              for food service/delivery.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              So, what&apos;s the big idea behind this?
            </p>
            <div
              id="Blogger-as-platform"
              className="mt-8 flex items-center gap-x-6"
            >
              <a
                href="/restaurants"
                className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Click to find out
              </a>
              <a
                href="https://mobile.reblug.com/login"
                className="text-sm font-semibold text-gray-900"
              >
                Partner Login <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            <img
              className="w-[450px] object-cover rounded-lg object-left"
              src="/images/logoCloud.png"
              alt="mcDonalds"
            />
            {/* <img
              className="max-h-12 w-full object-contain object-left"
              src="/images/Chick-fil-A-Logo.png"
              alt="Chick-fil-A-Logo"
              width={104}
              height={48}
            />
            <img
              className="max-h-12 w-full rounded-lg object-contain object-left"
              src="/images/bking.jpeg"
              alt="burgerKing"
              width={140}
              height={48}
            />
            <img
              className="max-h-12 rounded-lg w-full object-contain object-left"
              src="/images/kfc.png"
              alt="KFC"
              width={136}
              height={48}
            />
            <img
              className="max-h-12 rounded-lg w-full object-contain object-left"
              src="/images/inspire.png"
              alt="Inspire"
              width={158}
              height={48}
            />
            <img
              className="max-h-12 rounded-lg w-full object-contain object-left"
              src="/images/Dominoslogo.jpeg"
              alt="Dominos"
              width={120}
              height={38}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
