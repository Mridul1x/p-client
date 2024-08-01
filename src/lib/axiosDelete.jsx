import axios from "axios";
import toast from "react-hot-toast";

export const axiosDelete = async (endpoint, token = "") => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_PUBLIC_BASE_URL}${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.error("Error response:", error.response);
    toast.error(error.response?.data?.error || "An error occurred");
    throw error;
  }
};
