import React from "react";
import { Card, CardFooter, Image, CardBody, Button } from "@nextui-org/react";

const BrandAd = () => {
  return (
    <Card isFooterBlurred radius="lg" className="border-none m-3">
      <div className=" md:flex lg:flex mx-3">
        <img
          alt="Hotsauce"
          className="object-cover border rounded"
          height={200}
          src="/images/hotsauce.webp"
          width={200}
        />
        <CardBody className="px-3 py-0">
          <p className="text-black text-xl">
            So next time you find yourself at a trendy pop-up, remember to pack
            your Blazn' Barry's! It's the perfect way to add some sizzle to your
            culinary exploration. Ditch the dull, embrace the thrill! Head over
            to BlaznBarrys.com to find out where to buy a bottle and unleash the
            fiery potential of your food!
          </p>
        </CardBody>

        <CardFooter className="justify-between before:bg-slate-700 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Button
            className="text-tiny text-white bg-slate-700"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Visit page
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BrandAd;
