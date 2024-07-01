import axios from "axios";
import { toast } from "react-hot-toast";

export const axiosPost = async (endpoint, data, token = "") => {
  try {
    const res = await axios.post(
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
    toast.error(error.response?.data?.error);
  }
};
