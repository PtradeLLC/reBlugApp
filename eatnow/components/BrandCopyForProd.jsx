import React, { useState, useEffect } from "react";
import { Card, CardFooter, CardBody, Button } from "@nextui-org/react";

const BrandCopyAd = ({ productName, image, message }) => {
  const [copyInstance, setCopyInstance] = useState({
    productName,
    image,
    productMessage: message,
  });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Create a URL for the image file if available
    if (copyInstance.image) {
      const url = URL.createObjectURL(copyInstance.image);
      setImageUrl(url);

      // Cleanup the URL object when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [copyInstance.image]);

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none m-auto bg-slate-50 p-1"
    >
      <div className="flex flex-col md:flex-row lg:flex-row mb-2">
        <img
          alt={copyInstance.productName}
          className="object-cover border rounded m-auto"
          height={147}
          src={imageUrl || "/images/coffeeprod.jpg"}
          width={200}
        />
        <CardBody className="px-3 py-0 mt-4 md:mt-0 lg:mt-0">
          <h1 className="text-gray-800 font-semibold text-lg">
            {copyInstance.productName || "Product name"}
          </h1>
          <p className="text-gray-800 text-lg">
            {copyInstance.productMessage ||
              "This is a sample copy for an article about retail stores, specifically coffee. Your actual message will be shown once you begin to edit by using the above form entries, and when done you may insert into your article by clicking on the button below."}
          </p>
        </CardBody>
      </div>

      <CardFooter className="justify-between before:bg-slate-700 border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <Button
          className="text-tiny text-gray-800 bg-slate-300 rounded-md"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Visit page
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrandCopyAd;

// import React, { useState } from "react";
// import { Card, CardFooter, CardBody, Button } from "@nextui-org/react";

// const BrandCopyAd = ({ productName, image, message }) => {
//   const [copyInstance, setCopyInstance] = useState({
//     productName,
//     image,
//     productMessage: message,
//   });
//   return (
//     <Card
//       isFooterBlurred
//       radius="lg"
//       className="border-none m-auto bg-slate-50 p-1 "
//     >
//       <div className="flex flex-col md:flex-row lg:flex-row mb-2">
//         <img
//           alt={copyInstance.productName}
//           className="object-cover border rounded m-auto"
//           height={147}
//           src={
//             copyInstance.image
//               ? `${copyInstance.image.name}`
//               : "/images/coffeeprod.jpg"
//           }
//           width={200}
//         />
//         <CardBody className="px-3 py-0 mt-4 md:mt-0 lg:mt-0">
//           <h1 className="text-gray-800 font-semibold text-lg">
//             {copyInstance.productName || "Product name"}
//           </h1>
//           <p className="text-gray-800 text-lg">
//             {copyInstance.productMessage ||
//               "This is a sample copy for an article about retail stores, specifically coffee. Your actual message will be shown once you begin to edit by using the above form entries, and when done you may insert into your article by clicking on the button below."}
//           </p>
//         </CardBody>
//       </div>

//       <CardFooter className="justify-between before:bg-slate-700 border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
//         <Button
//           className="text-tiny text-gray-800 bg-slate-300 rounded-md"
//           variant="flat"
//           color="default"
//           radius="lg"
//           size="sm"
//         >
//           Visit page
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default BrandCopyAd;
