import React from "react";
import Verification from "../../components/VerificationPg";
import { useRouter } from "next/navigation";

const UserVerification = () => {
  const router = useRouter();
  const { params } = router.query; // Destructure to get the params from query

  const secret = params ? params.secret : null;

  return (
    <div>
      <Verification secret={secret} />
    </div>
  );
};

export default UserVerification;
