"use client";

import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes from prop-types package
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TogglePageModal = ({
  open,
  setOpen,
  userType,
  setUserType,
  onLogout,
}) => {
  const [selectedType, setSelectedType] = useState(userType);

  const handleChange = (event) => {
    setSelectedType(event);
  };

  const onSubmit = () => {
    console.log("Selected", selectedType);
    setUserType(selectedType);
    setOpen(false);
  };

  const handleLogout = () => {
    // Clear userType in parent component and logout
    setUserType("Blogger"); // Set default userType
    onLogout(); // Handle logout logic
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Switch User Role</DialogTitle>
          <DialogDescription>
            <span className="font-semibold text-red-700">
              * Please note that the following action is NOT reversible. It is
              permanent.
            </span>
            <br />
            Select a User Role.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={handleChange} value={selectedType}>
          <SelectTrigger>
            <SelectValue placeholder="I want to use ReBlug as" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Blogger">Blogger</SelectItem>
            <SelectItem value="Brand">Brand / Org</SelectItem>
            <SelectItem value="Social Media Partner">
              Social Media Partner
            </SelectItem>
            <SelectItem value="Restaurant">Food & Beverages</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button onClick={onSubmit}>Submit</Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

TogglePageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  setUserType: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default TogglePageModal;

// "use client";

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const TogglePageModal = ({
//   open,
//   setOpen,
//   userType,
//   setUserType,
//   onLogout,
// }) => {
//   const [selectedType, setSelectedType] = useState(userType);

//   const handleChange = (event) => {
//     setSelectedType(event);
//   };

//   const onSubmit = () => {
//     console.log("Selected", selectedType);
//     setUserType(selectedType);
//     setOpen(false);
//   };

//   const handleLogout = () => {
//     // Clear userType in parent component and logout
//     setUserType("Blogger"); // Set default userType
//     onLogout(); // Handle logout logic
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Switch User Role</DialogTitle>
//           <DialogDescription>
//             <span className="font-semibold text-red-700">
//               * Please note that the following action is NOT reversible. It is
//               permanent.
//             </span>
//             <br />
//             Select a User Role.
//           </DialogDescription>
//         </DialogHeader>
//         <Select onValueChange={handleChange} value={selectedType}>
//           <SelectTrigger>
//             <SelectValue placeholder="I want to use ReBlug as" />
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
//           <Button variant="outline" onClick={handleLogout}>
//             Logout
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// TogglePageModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   userType: PropTypes.string.isRequired,
//   setUserType: PropTypes.func.isRequired,
//   onLogout: PropTypes.func.isRequired,
// };

// export default TogglePageModal;

// "use client";
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const TogglePageModal = ({ open, setOpen, userType, setUserType }) => {
//   const [selectedType, setSelectedType] = useState(userType);

//   const handleChange = (event) => {
//     setSelectedType(event);
//   };

//   const onSubmit = () => {
//     setUserType(selectedType);
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Switch User Role</DialogTitle>
//           <DialogDescription>
//             <span className="font-semibold text-red-700">
//               * Please note that the following action is NOT reversible. It is
//               permanent.
//             </span>
//             <br />
//             Select a User Role.
//           </DialogDescription>
//         </DialogHeader>
//         <Select onValueChange={handleChange} value={selectedType}>
//           <SelectTrigger>
//             <SelectValue placeholder="I want to use ReBlug as" />
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

// TogglePageModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   userType: PropTypes.string.isRequired,
//   setUserType: PropTypes.func.isRequired,
// };

// export default TogglePageModal;
