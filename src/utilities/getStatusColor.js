export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "text-green-500";
    case "pending":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};
