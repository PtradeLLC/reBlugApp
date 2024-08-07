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
import SocialMedDashboard from "@/components/DashboardUI";
import BloggerDashboard from "@/components/BloggerDashboardUI";
import BrandModal from "@/components/BrandModal";
import RestaurantDashboard from "@/components/RestaurantModal";
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
  user,
  userType,
  setUserType,
  onLogout,
}) => {
  const [selectedType, setSelectedType] = useState(userType);
  const [showComponent, setShowComponent] = useState(null);

  const handleChange = (event) => {
    setSelectedType(event);
  };

  const onSubmit = () => {
    setUserType(selectedType);
    if (selectedType === "Blogger") {
      setShowComponent("Blogger");
    } else if (selectedType === "Brand") {
      setShowComponent("Brand");
    } else if (selectedType === "Social Media Partner") {
      setShowComponent("Social Media Partner");
    }
    setOpen(false);
  };

  const handleLogout = () => {
    // Clear userType in parent component and logout
    setUserType("Blogger"); // Set default userType
    onLogout(); // Handle logout logic
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch User Role</DialogTitle>
            <DialogDescription>
              <span className="font-semibold text-red-700">
                * Please note that you will not be able to switch back to the
                previous role until your next login.
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
              <SelectItem value="Brand">Company/Organization</SelectItem>
              <SelectItem value="Social Media Partner">
                Social Media Partner
              </SelectItem>
              {/* <SelectItem value="Restaurant">Food & Beverages</SelectItem> */}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button onClick={onSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
