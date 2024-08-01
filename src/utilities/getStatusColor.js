export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "text-green-600"; // A darker green for better contrast
    case "pending":
      return "text-yellow-500"; // A bright yellow for visibility
    case "failed":
      return "text-red-600"; // A darker red for better contrast
    case "cancelled":
      return "text-orange-500"; // Orange to differentiate from 'failed'
    default:
      return "text-gray-500"; // Gray for unknown statuses
  }
};
