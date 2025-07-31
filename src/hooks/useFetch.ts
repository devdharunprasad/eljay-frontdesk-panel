import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"; // Import react-cookie
import { toast } from "react-hot-toast";

export const useFetch = (endpoint: string, refreshDep : number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [cookies] = useCookies(["token"]); // Get token from cookies

  useEffect(() => {
    const handleFetch = async () => {
       
      setIsLoading(true);
      setData(null);

      try {
        const API_URL = import.meta.env.VITE_API_URL;
        if (!API_URL) {
          throw new Error("API URL is not defined. Please check your environment variables.");
        }

        const res = await axios.get(`${API_URL}${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`, // Include Bearer Token
          },
        });

        if (res.status === 200) {
          setData(res.data);
        } else {
          throw new Error("Failed to fetch data.");
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetch();
  }, [endpoint, cookies.token, refreshDep]); // Re-fetch when endpoint or token changes

  return { data, isLoading };
};