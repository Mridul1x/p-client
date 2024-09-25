import axios from "axios";
import { toast } from "react-hot-toast";

export const axiosPost = async (
  endpoint,
  data,
  token = "",
  isFileUpload = false
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (isFileUpload) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    const res = await axios.post(
      `${import.meta.env.VITE_PUBLIC_BASE_URL}${endpoint}`,
      data,
      config
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
