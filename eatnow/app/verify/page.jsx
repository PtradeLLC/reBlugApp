"use client";
import React from "react";
import Verification from "../../components/VerificationPg";
import { useRouter } from "next/navigation";

const UserVerification = () => {
  //   const router = useRouter();
  //   const { params } = router.query;

  //   const secret = params ? params.secret : null;

  return (
    <div>
      <Verification />
      {/* <Verification secret={secret} /> */}
    </div>
  );
};

export default UserVerification;
