import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import DetailsSection from "@/forms/manage-restaurant-form/DetailsSection.tsx";
import CuisinesSection from "@/forms/manage-restaurant-form/CuisinesSection.tsx";
import MenuSection from "@/forms/manage-restaurant-form/MenuSection.tsx";
import ImageSection from "@/forms/manage-restaurant-form/ImageSection.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Restaurant } from "@/types.ts";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName : z.string({ required_error : "Restaurant Name is required" }),
    city : z.string({ required_error : "City is required" }),
    country : z.string({ required_error : "Country is required" }),
    deliveryPrice : z.coerce.number({
        required_error : "Delivery Price is required",
        invalid_type_error : "Delivery Price must be a valid Number"
    }),
    estimatedDeliveryTime : z.coerce.number({
        required_error : "Delivery Time is required",
        invalid_type_error : "Delivery Time must be a valid Number"
    }),
    cuisines : z.array(z.string()).nonempty({ message : "Please select a cuisine!" }),
    menuItems : z.array(
        z.object({
            name : z.string().min(1, "Name is required"),
            price : z.coerce.number().min(1, "Price is required"),
        })
    ),
    imageUrl : z.string().optional(),
    imageFile : z.instanceof(File, { message : "Image is required" }).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message : "Either imageUrl or imageFile must be provided",
    path : ["imageFile"]
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    onSave : (restaurantFormData : FormData) => void;
    isLoading : boolean;
    restaurant? : Restaurant;
}

export default function ManageRestaurantForm({ onSave, isLoading, restaurant } : Props) {
    const form = useForm<RestaurantFormData>(
        {
            resolver : zodResolver(formSchema),
            defaultValues : {
                cuisines : [],
                menuItems : [{ name : "", price : 0 }]
            }
        }
    )

    useEffect(() => {
        if (!restaurant) return;
        form.reset(restaurant);
    }, [form, restaurant]);

    const onSubmit = (formDataJson : RestaurantFormData) => {
        const {
            restaurantName,
            city,
            country,
            deliveryPrice,
            estimatedDeliveryTime,
            cuisines,
            imageFile,
            menuItems
        } = formDataJson;
        const formData = new FormData();
        formData.append("restaurantName", restaurantName);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("deliveryPrice", (deliveryPrice).toString());
        formData.append("estimatedDeliveryTime", estimatedDeliveryTime.toString());
        cuisines.forEach((cuisine, index) => formData.append(`cuisines[${index}]`, cuisine));
        menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
        });
        if (imageFile) formData.append("imageFile", imageFile);
        onSave(formData);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-6 md:p-10 rounded-lg">
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImageSection/>
                {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    )
}