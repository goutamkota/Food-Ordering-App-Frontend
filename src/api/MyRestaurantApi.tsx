import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order, Restaurant } from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type UpdateOrderStatusRequest = {
    orderId : string;
    status : string;
}

export function useGetMyRestaurantOrders() {
    const { getAccessTokenSilently } = useAuth0();
    const getMyRestaurantOrdersRequest = async () : Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers : {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }
        return response.json();
    };
    const { data : orders, isLoading } = useQuery(
        "fetchMyRestaurantOrders",
        getMyRestaurantOrdersRequest
    );
    return { orders, isLoading };
}

export function useCreateMyRestaurant() {
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

export function useGetMyRestaurant() {
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

export function useUpdateMyRestaurant() {
    const { getAccessTokenSilently } = useAuth0();
    const updateRestaurantRequest = async (restaurantFormData : FormData) : Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method : "PUT",
            headers : {
                Authorization : `Bearer ${accessToken}`,
            },
            body : restaurantFormData
        });
        if (!response.ok) throw new Error("Failed to update restaurant");
        return response.json();
    }
    const { mutate : updateRestaurant, isLoading, error, isSuccess } = useMutation(updateRestaurantRequest);
    if (isSuccess) toast.success("Successfully updated Restaurant!");
    if (error) toast.error("Failed to update restaurant!");
    return { updateRestaurant, isLoading };
}

export function useUpdateMyRestaurantOrderStatus() {
    const { getAccessTokenSilently } = useAuth0();
    const updateMyRestaurantOrderStatusRequest = async (updateStatusOrderRequest : UpdateOrderStatusRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
            `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
            {
                method : "PATCH",
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({ status : updateStatusOrderRequest.status }),
            }
        )
        if (!response.ok) throw new Error("Failed to update order status");
        return response.json();
    }
    const {
        mutate : updateRestaurantStatus,
        isLoading,
        isError,
        isSuccess,
        reset
    } = useMutation(updateMyRestaurantOrderStatusRequest);
    if (isSuccess) toast.success("Successfully updated Order Status!");
    if (isError) {
        toast.error("Unable to update order status!");
        reset();
    }
    return {
        updateRestaurantStatus,
        isLoading
    }
}