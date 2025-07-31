import axios from "axios"
import { useState } from "react"
import { useCookies } from 'react-cookie';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const useAuth = () => {
    const [_, setCookie] = useCookies(['user',"token"]);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const handleRegister = async(url:string, formData:any, redirect_url:string) => {
        setIsLoading(true)
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}${url}`,formData)
           
            const {data} = await res;
    
            if(data){
                setCookie("user",data?.user?.id)
                setCookie("token", data?.access_token)
                setIsLoading(false)
                navigate(redirect_url)
            }
        }
       catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
        }
        finally{
            setIsLoading(false)
        }      
    }
    return {isLoading, handleRegister}
}