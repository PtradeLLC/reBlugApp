import React from "react";

const CreditCartInput = () => {
  return (
    <div>
      <div className="flex flex-col justify-around bg-gray-200 p-4 border border-white border-opacity-30 rounded-lg shadow-md max-w-xs mx-auto">
        <div className="flex flex-row items-center justify-between mb-3">
          <input
            className="w-full h-10 border-none outline-none text-sm bg-gray-300 text-gray-800 font-semibold caret-orange-500 pl-2 mb-3 flex-grow cursor-not-allowed rounded-sm"
            type="text"
            name="cardName"
            disabled
            id="cardName"
            placeholder="Your Name"
          />
          <div className="flex items-center justify-center relative w-14 h-9  border-white border-opacity-20 rounded-md">
            <svg
              className="text-gray-800 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ff9800"
                d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
              ></path>
              <path
                fill="#d50000"
                d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
              ></path>
              <path
                fill="#ff3d00"
                d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <input
            className="w-full h-10 border-none cursor-not-allowed outline-none text-sm bg-gray-300 text-gray-800 font-semibold caret-orange-500 pl-2 rounded-sm"
            type="text"
            name="cardNumber"
            disabled
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
          />
          <div className="flex flex-row justify-between">
            <input
              className="w-full h-10 border-none cursor-not-allowed outline-none text-sm bg-gray-300 text-gray-800 font-semibold caret-orange-500 pl-2"
              type="text"
              name="expiryDate"
              disabled
              id="expiryDate"
              placeholder="MM/YY"
            />
            <input
              className="w-full h-10 border-none cursor-not-allowed outline-none text-sm bg-gray-300 text-gray-800 font-semibold caret-orange-500 pl-2 rounded-sm"
              type="text"
              name="cvv"
              disabled
              id="cvv"
              placeholder="CVV"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCartInput;
