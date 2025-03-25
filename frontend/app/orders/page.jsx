"use client";
import React, { useState } from "react";
import Orders from "../../components/OrdersComponent";

const OrdersPage = () => {
  const [openModal, setOpenModal] = useState(true);
  return (
    <>
      <div>
        <Orders openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </>
  );
};

export default OrdersPage;
