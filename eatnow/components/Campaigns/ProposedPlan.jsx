import { PaperClipIcon } from "@heroicons/react/20/solid";

const Plan = ({ textData }) => {
  if (!textData || textData.length === 0) {
    return <div>No content available</div>;
  }

  return (
    <div className="mt-6 border-t border-gray-100">
      {textData.map((data, index) => {
        const { assistantResponse } = data;
        return (
          <div key={index} className="mt-6">
            <dl className="divide-y divide-gray-100">
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 flex flex-col sm:px-0">
                    <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-line">
                      {assistantResponse}
                    </p>
                  </div>
                </dl>
              </div>
              {/* Attachment section can be conditionally rendered if needed */}
            </dl>
          </div>
        );
      })}
    </div>
  );
};

export default Plan;

// import { PaperClipIcon } from "@heroicons/react/20/solid";

// const Plan = ({ textData }) => {
//   if (!textData || textData.length === 0) {
//     return <div>No content available</div>;
//   }

//   // Helper function to render objects recursively
//   const renderContent = (value) => {
//     if (typeof value === "object" && !Array.isArray(value)) {
//       return (
//         <div className="pl-4">
//           {Object.entries(value).map(([subKey, subValue]) => (
//             <div key={subKey}>
//               <span className="font-semibold">
//                 {subKey.charAt(0).toUpperCase() + subKey.slice(1)}:
//               </span>{" "}
//               {renderContent(subValue)}
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return value;
//   };

//   return (
//     <div className="mt-6 border-t border-gray-100">
//       {textData.map((data, index) => {
//         const { messages } = data.item;

//         console.log("Messages frontend", messages);
//         console.log("Data Item frontend", data.item);
//         console.log("Data frontend", data);

//         return (
//           <div key={index} className="mt-6">
//             <dl className="divide-y divide-gray-100">
//               <div className="px-4 sm:px-0">
//                 <h3 className="text-base font-semibold leading-7 text-gray-900">
//                   Campaign Analysis
//                 </h3>
//               </div>
//               <div className="mt-6 border-t border-gray-100">
//                 <dl className="divide-y divide-gray-100">
//                   {messages.map((item, i) => (
//                     <div key={i} className="px-4 py-6 flex flex-col sm:px-0">
//                       {typeof item.content === "object" &&
//                       !Array.isArray(item.content) ? (
//                         Object.entries(item.content).map(([key, value]) => (
//                           <div key={key}>
//                             <dt className="text-sm font-medium leading-6 text-gray-900">
//                               {key.charAt(0).toUpperCase() + key.slice(1)}
//                             </dt>
//                             <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//                               {renderContent(value)}
//                             </dd>
//                           </div>
//                         ))
//                       ) : (
//                         <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//                           {item.content}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </dl>
//               </div>
//               {/* Attachment section can be conditionally rendered if needed */}
//             </dl>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Plan;
