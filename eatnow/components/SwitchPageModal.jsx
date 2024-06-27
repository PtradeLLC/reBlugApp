"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TogglePageModal = ({ open, setOpen, setUserType }) => {
  const [selectedType, setSelectedType] = React.useState("");

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const onSubmit = () => {
    setUserType(selectedType);
    // console.log("Oh my gawd:", selectedType);
    // setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Switch User Role</DialogTitle>
          <DialogDescription>
            <span className="font-semibold">
              * Please note that the following action is NOT reversible. It is
              permanent.
            </span>
            <br />
            Select a User Role.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="I want to use ReBlug as" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Blogger">Blogger</SelectItem>
            <SelectItem value="Brand">Brand</SelectItem>
            <SelectItem value="Social Media Partner">
              Social Media Partner
            </SelectItem>
            <SelectItem value="Restaurant">Food & Beverages</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

TogglePageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setUserType: PropTypes.func.isRequired,
};

export default TogglePageModal;

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const SwitchModalPage = ({ open, setOpen, setUserType }) => {
//   const [selectedType, setSelectedType] = useState("");

//   const onSubmit = () => {
//     setUserType(selectedType);
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Switch User Type</DialogTitle>
//           <DialogDescription>
//             Select a user type to switch to.
//           </DialogDescription>
//         </DialogHeader>
//         <Select onValueChange={setSelectedType}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select user type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Blogger">Blogger</SelectItem>
//             <SelectItem value="Brand">Brand</SelectItem>
//             <SelectItem value="Social Media Partner">
//               Social Media Partner
//             </SelectItem>
//             <SelectItem value="Restaurant">Food & Beverages</SelectItem>
//           </SelectContent>
//         </Select>
//         <DialogFooter>
//           <Button onClick={onSubmit}>Submit</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// SwitchModalPage.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   setUserType: PropTypes.func.isRequired,
// };

// export default SwitchModalPage;
