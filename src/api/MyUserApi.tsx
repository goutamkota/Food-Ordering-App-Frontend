import { useMutation, useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { User } from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method : "GET",
            headers : {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json",
            },
        });
        if (!response.ok) throw new Error("Failed to fetch User");
        return response.json();
    }
    const { data : currentUser, isLoading, error } = useQuery("fetchCurrentUser", getMyUserRequest);
    if (error) toast.error(error.toString());
    return { currentUser, isLoading };
}

type CreateUserRequest = {
    auth0Id : string;
    email : string;
};

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const createMyUserRequest = async (user : CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method : "POST",
            headers : {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(user)
        });
        if (!response.ok) toast.error("Failed to create user");
    }
    const {
        mutateAsync : createUser,
        isLoading,
        isSuccess,
        error,
        reset
    } = useMutation(createMyUserRequest);
    if (isSuccess) toast.success("Successfully created user!");
    if (error) {
        toast.error(error.toString());
        reset();
    }
    return {
        createUser,
        isLoading
    }
}

type UpdateMyUserRequest = {
    name : string;
    address : string;
    city : string;
    country : string;
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const updateMyUserRequest = async (formData : UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method : "PUT",
            headers : {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        return response.json();
    }
    const { mutateAsync : updateUser, isLoading, error, isSuccess, reset } = useMutation(updateMyUserRequest);
    if (isSuccess) toast.success("Successfully updated user!");
    if (error) {
        toast.error(error.toString());
        reset();
    }
    return {
        updateUser,
        isLoading,
    }
}