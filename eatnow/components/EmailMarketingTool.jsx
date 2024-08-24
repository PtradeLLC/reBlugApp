import React, { useState, useEffect } from "react";
import RaiseFunds from "@/components/FundRaise";
import Saas from "@/components/Saas";
import Awareness from "@/components/Awareness";
import Ecommerce from "@/components/Ecommerce";
import EmailNewsletter from "@/components/EmailNewsletter";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const SeriesModalComponent = ({ isOpen, onClose, title }) => {
  const [campaignEmail, setCampaignEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", campaignEmail);
  };

  return (
    <Modal
      backdrop="blur"
      placement="auto"
      isDismissable={false}
      size="3xl"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        backdrop: "bg-[#292f46]/80 backdrop-opacity-40",
      }}
    >
      <ModalContent className="bg-slate-300 rounded-sm">
        <ModalHeader className="flex flex-col gap-1 bg-slate-50">
          Launching {title} campaign
        </ModalHeader>
        <ModalBody className="bg-white overflow-y-auto max-h-[50vh]">
          <div id="top" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mt-5 px-4">
              <div>
                <div className="flex flex-col col-span-full">
                  <label>Type of Campaign:</label>
                  <select
                    name="campaignType"
                    value={campaignEmail}
                    onChange={(e) => setCampaignEmail(e.target.value)}
                  >
                    <option value="">Select campaign type</option>
                    <option value="Fundraising">Fundraising</option>
                    <option value="SaaS Subscriptions">
                      SaaS Subscriptions
                    </option>
                    <option value="Raise Awareness">Raise Awareness</option>
                    <option value="Product Sales">Product Sales</option>
                    <option value="Newsletter (communication)">
                      Newsletter (communication)
                    </option>
                    <option value="Newsletter (marketing)">
                      Newsletter (marketing)
                    </option>
                  </select>
                </div>

                <div className="col-span-full mt-5">
                  {campaignEmail === "Fundraising" && <RaiseFunds />}
                  {campaignEmail === "SaaS Subscriptions" && <Saas />}
                  {campaignEmail === "Raise Awareness" && <Awareness />}
                  {campaignEmail === "Product Sales" && <Ecommerce />}
                  {campaignEmail === "Newsletter (communication)" && (
                    <EmailNewsletter />
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="bg-slate-50">
          <Button
            color="success"
            onClick={onClose}
            disabled
            className="disabled:cursor-not-allowed"
          >
            Submit
          </Button>
          <Button color="error" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SeriesModalComponent;
