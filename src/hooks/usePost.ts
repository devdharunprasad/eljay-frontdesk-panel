import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie"; // Import react-cookie

export const usePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]); // Get token from cookies
  const handlePost = async (
    endpoint: string,
    body: any,
    redirect_url?: string,
    onSuccess?: (response: any) => void
  ) => {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_APP_API_URL;
      if (!API_URL) {
        throw new Error("API URL is not defined.");
      }
  
      const res = await axios.post(`${API_URL}${endpoint}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });
  
      if (res.status === 200 || res.status === 201) {
        toast.success("Successfully posted! 🎉");
        if (onSuccess) onSuccess(res.data);
        if (redirect_url) navigate(redirect_url);
        return res.data; // 👈 This is the important addition
      }
    } catch (error: any) {
      console.error("Error posting data:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handlePost, isLoading };
};