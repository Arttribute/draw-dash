"use client";
import {
  IDKitWidget,
  VerificationLevel,
  type ISuccessResult,
} from "@worldcoin/idkit";
import { Button } from "../ui/button";
import { verify } from "@/app/actions/verify";

const handleVerify = async (res: ISuccessResult) => {
  console.log(
    "Proof received from IDKit, sending to backend:\n",
    JSON.stringify(res)
  );
  const data = await verify(res);
  if (data.success) {
    console.log("Successful response from backend:\n", JSON.stringify(data));
  } else {
    throw new Error(`Verification failed: ${data.detail}`); // shows on the UI
  }
};

const onSuccess = (res: ISuccessResult) => {
  window.alert(
    "Successfully verified with World ID! Your nullifier hash is: " +
      res.nullifier_hash
  );
};

const WorldCard = () => {
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;

  if (!app_id) {
    throw new Error("Worldcoin app_id is not set in env variables!");
  }
  if (!action) {
    throw new Error("Worldcoin action is not set in env variables!");
  }

  return (
    <IDKitWidget
      app_id={app_id}
      action={action}
      onSuccess={onSuccess}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
    </IDKitWidget>
  );
};

export default WorldCard;
