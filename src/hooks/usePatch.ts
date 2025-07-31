import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie"; // Import react-cookie
export const usePatch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]); // Get token from cookies

  const handlePatch = async (endpoint: string, id:string|number, body: unknown, redirect_url?: string, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_APP_API_URL;
      if (!API_URL) {
        throw new Error("API URL is not defined. Please check your environment variables.");
      }
      const res = await axios.patch(`${API_URL}${endpoint}/${id}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`, // Include Bearer Token
        },
      });
      if (res.status === 200 || res.status === 204) {
        toast.success("Successfully updated! 🎉");
        // Call the success callback (for tab switch or additional actions)
        if (onSuccess) {
          onSuccess();
        }
        // Redirect if a URL is provided
        if (redirect_url) {
          navigate(redirect_url);
        }
      }
    } catch (error: any) {
      console.error("Error updating data:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return { handlePatch, isLoading };
};