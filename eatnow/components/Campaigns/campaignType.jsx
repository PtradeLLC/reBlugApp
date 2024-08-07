import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "./data";

const Campaign = () => {
  return (
    <Select
      label="Favorite Animal"
      placeholder="Select an animal"
      selectionMode="multiple"
      className="max-w-xs"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
};

export default Campaign;
