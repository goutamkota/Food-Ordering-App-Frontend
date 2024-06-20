import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "@/types.ts";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
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

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const getMyRestaurantRequest = async () : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method : "GET",
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) throw new Error("Failed to fetch Restaurant");
        return response.json()
    }
    const { data : restaurant, isLoading, error, isSuccess } = useQuery("fetchMyRestaurant", getMyRestaurantRequest);
    if (isSuccess) toast.success("Successfully fetched Restaurant!");
    if (error) toast.error("Failed to fetch Restaurant!");
    return { restaurant, isLoading };
}

export const useUpdateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updateRestaurantRequest = async (restaurantFormData: FormData) : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method : "PUT",
            headers: {
                Authorization : `Bearer ${accessToken}`,
            },
            body: restaurantFormData
        });
        if (!response.ok) throw new Error("Failed to update restaurant");
        return response.json();
    }
    const { mutate : updateRestaurant, isLoading, error, isSuccess } = useMutation(updateRestaurantRequest);
    if (isSuccess) toast.success("Successfully updated Restaurant!");
    if (error) toast.error("Failed to update restaurant!");
    return { updateRestaurant, isLoading };
}