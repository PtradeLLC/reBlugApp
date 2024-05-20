import React from "react";
import { Avatar } from "@nextui-org/react";

export default function Avatar() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar
        isBordered
        color="success"
        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
      />
      <Avatar
        isBordered
        color="warning"
        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
      />
      <Avatar
        isBordered
        color="danger"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      />
    </div>
  );
}
