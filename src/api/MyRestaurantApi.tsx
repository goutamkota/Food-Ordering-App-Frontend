import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "@/types.ts";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function useCreateMyRestaurant() {
    const { getAccessTokenSilently } = useAuth0();
    const createMyRestaurantRequest = async (restaurantFormData : FormData) : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method : "POST",
            headers : {
                Authorization : `Bearer ${accessToken}`
            },
            body : restaurantFormData,
        });
        if (!response.ok) throw new Error("Failed to create restaurant");
        return response.json();
    }
    const { mutate : createRestaurant, isLoading, error, isSuccess } = useMutation(createMyRestaurantRequest);
    if (isSuccess) toast.success("Successfully created Restaurant!");
    if (error) toast.error("Failed to create Restaurant!");
    return { createRestaurant, isLoading };
}