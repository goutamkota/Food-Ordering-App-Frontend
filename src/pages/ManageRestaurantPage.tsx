import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import useCreateMyRestaurant from "@/api/MyRestaurantApi.tsx";

export default function ManageRestaurantPage() {
    const {createRestaurant, isLoading} = useCreateMyRestaurant();
    return (
        <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading}/>
    );
}