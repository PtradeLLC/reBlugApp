import React from "react";
import { Card, CardFooter, Image, CardBody, Button } from "@nextui-org/react";

const ProdBrandAd = () => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none m-auto bg-slate-50 p-1"
    >
      <div className="flex flex-col md:flex-row lg:flex-row mb-2">
        <img
          alt="Hotsauce"
          className="object-cover border rounded m-auto"
          height={200}
          src="/images/hotsauce.webp"
          width={200}
        />
        <CardBody className="px-3 py-0 mt-4 md:mt-0 lg:mt-0">
          <p className="text-black text-xl">
            So next time you find yourself at a trendy pop-up, remember to pack
            your Blazn' Barry's! It's the perfect way to add some sizzle to your
            culinary exploration. Ditch the dull, embrace the thrill! Head over
            to BlaznBarrys.com to find out where to buy a bottle and unleash the
            fiery potential of your food!
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

export default ProdBrandAd;
