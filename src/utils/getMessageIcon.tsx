import { Check, CheckCheck } from "lucide-react";

export const getMessageIcon = (
  isRead: boolean | undefined,
  isSent: boolean | undefined,
  isRecieved: boolean
) => {
  if (isRecieved) {
    return null;
  } else if (isRead) {
    return <CheckCheck color="#00BFFF" size={15} className="mr-[4px]" />;
  } else if (isSent) {
    return <CheckCheck color="gray" size={15} className="mr-[4px]" />;
  } else {
    return <Check color="gray" size={15} className="mr-[4px]" />;
  }
};
