//   THIS IS THE TEMPLATE
import { useState } from "react";

const SponsMessage = () => {
  const [brandName, setBrandName] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productMessage, setProductMessage] = useState("");
  const [productWebsite, setProductWebsite] = useState("");

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-slate-700 shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pb-12 pt-10 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:px-20 xl:py-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block text-3xl">{brandName}</span>
                <span className="block text-2xl">{productName}</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-slate-200">
                {productMessage}
              </p>
              <a
                href={productWebsite}
                className="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-slate-600 shadow hover:bg-slate-50"
              >
                Sign up for free
              </a>
            </div>
          </div>
          <div className="aspect-h-3 aspect-w-5 -mt-6 md:aspect-h-1 md:aspect-w-2">
            <img
              alt="App screenshot"
              src={productImage}
              className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsMessage;
