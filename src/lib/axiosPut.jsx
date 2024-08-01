import axios from "axios";
import toast from "react-hot-toast";

// axiosPut function
export const axiosPut = async (endpoint, data, token = "") => {
  try {
    const res = await axios.put(
      // Use axios.put instead of axios.post
      `${import.meta.env.VITE_PUBLIC_BASE_URL}${endpoint}`,
      data,
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
