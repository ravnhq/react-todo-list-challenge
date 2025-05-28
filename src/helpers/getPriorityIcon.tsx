import { TbUrgent } from "react-icons/tb";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import type { ReactElement } from "react";

export const getPriorityIcon = (priority: string): ReactElement | null => {
  switch (priority) {
    case "Urgent":
      return <TbUrgent color="red" size={25} />;
    case "High":
      return <FcHighPriority size={25} />;
    case "Normal":
      return <FcMediumPriority size={25} />;
    case "Low":
      return <FcLowPriority size={25} />;
    default:
      return null;
  }
};
