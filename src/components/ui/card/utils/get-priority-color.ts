export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return "#F28B82";
    case "High":
      return "#F9A825";
    case "Normal":
      return "#81C784";
    case "Low":
      return "#64B5F6";
  }
};
