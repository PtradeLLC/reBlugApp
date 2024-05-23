
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const DropdownContent = ({ blogCategories, onSelect }) => {
    const [selectedNiche, setSelectedNiche] = useState(null);

    const handleNicheSelect = (niche) => {
        setSelectedNiche(niche);
        onSelect(niche);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className="text-black bg-white font-thin h-7 rounded-none mb-1">
                    <img src="/images/niche.png" className="w-6 h-6" />
                    {selectedNiche ? selectedNiche.name : "Select a niche"}
                </Button>
            </DropdownTrigger>
            <hr />
            <DropdownMenu aria-label="Dropdown blogCategories" className="dropdown-menu overflow-y-scroll bg-white">
                {blogCategories && blogCategories.map((item) => (
                    <DropdownItem key={item.name} onClick={() => handleNicheSelect(item)} className="text-black font-thin">
                        {item.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownContent;

