import React from "react";
import { Button } from "@/components/ui/button";

const BCommerceArray = () => {
  return (
    <div>
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-gray-600 pl-1">
          bCommerce Products
        </p>
        <div className="border mt-3 mx-2 px-3">
          <Button className="my-2 mx-2" type="button">
            Beginners Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BCommerceArray;
