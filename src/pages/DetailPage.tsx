import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/api/RestaurantApi.tsx";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItem from "@/components/MenuItem.tsx";
import { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card.tsx";
import OrderSummary from "@/components/OrderSummary.tsx"
import { MenuItem as MenuItemType } from "@/types.ts";
import CheckoutButton from "@/components/CheckoutButton.tsx";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm.tsx";

export type CartItem = {
    _id : string;
    name : string;
    price : number;
    quantity : number;
}

export default function DetailPage() {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    const addToCart = (menuItem : MenuItemType) => {
        setCartItems((prevCartItem) => {
            const existingCartItem = prevCartItem.find((cartItem) => cartItem._id === menuItem._id);
            let updatedCartItems;
            if (existingCartItem) {
                updatedCartItems = prevCartItem.map((cartItem) => cartItem._id === menuItem._id ? {
                    ...cartItem,
                    quantity : cartItem.quantity + 1
                } : cartItem);
            } else {
                updatedCartItems = [...prevCartItem, {
                    _id : menuItem._id,
                    name : menuItem.name,
                    price : menuItem.price,
                    quantity : 1,
                }]
            }
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
            return updatedCartItems;
        })
    };
    const removeFromCart = (cartItem : CartItem) => {
        setCartItems((prevCartItem) => {
            const updatedCartItems = prevCartItem.filter((item) => cartItem._id !== item._id);
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
            return updatedCartItems;
        })
    }
     const onCheckOut = (userFormData: UserFormData) => {
         console.log(userFormData)
     }
    if (isLoading || !restaurantId) return "Loading...";
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant?.imageUrl}
                    alt="Restaurant image"
                    className="rounded-md object-cover h-full w-full"/>
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-20">
                <div className="flex flex-col gap-4">
                    {restaurant && <RestaurantInfo restaurant={restaurant}/>}
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {
                        restaurant?.menuItems.map((menuItem, index) => (
                            <MenuItem key={index} menuItem={menuItem} addToCart={() => addToCart(menuItem)}/>
                        ))
                    }
                </div>
                <div>
                    <Card>
                        {restaurant && <OrderSummary restaurant={restaurant} cartItems={cartItems}
                                                     removeFromCart={removeFromCart}/>}
                        <CardFooter>
                            <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckOut}/>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}