import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateRestaurant } from "@/api/MyRestaurantApi.tsx";

export default function ManageRestaurantPage() {
    const { restaurant, isLoading : isGetLoading } = useGetMyRestaurant();
    const { createRestaurant, isLoading : isCreateLoading } = useCreateMyRestaurant();
    const { updateRestaurant, isLoading : isUpdateLoading } = useUpdateRestaurant();
    const isEditing = !!restaurant;
    if (isGetLoading) return <span>Loading...</span>;
    // if (isUpdateLoading) return <span>Loading...</span>;
    return (
        <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}/>
    );
}