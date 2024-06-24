import { Restaurant } from "@/types.ts";
import { CartItem } from "@/pages/DetailPage.tsx";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Trash } from "lucide-react";

type Props = {
    restaurant : Restaurant;
    cartItems : CartItem[];
    removeFromCart : (cartItem : CartItem) => void;
}

export default function OrderSummary({ restaurant, cartItems, removeFromCart } : Props) {
    const getTotalCost = () => {
        const totalInRupees = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return totalInRupees + restaurant.deliveryPrice
    }
    return (
        <>
            <CardHeader>
                <CardTitle className="text-xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>₹{getTotalCost()}</span>
                    <span><Trash /></span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {
                    cartItems.map((item, index) => (
                        <div className="flex justify-between" key={index}>
                        <span>
                          <Badge variant="outline" className="mr-2">
                              {item.quantity}
                          </Badge>
                            {item.name}
                        </span>
                            <span className="flex items-center gap-1">
                            ₹{item.price}
                        </span>
                            <span>
                                <Trash color="red" className="cursor-pointer" size={20} onClick={()=> removeFromCart(item)}/>
                            </span>
                        </div>
                    ))
                }
                <Separator/>
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{restaurant.deliveryPrice}</span>
                </div>
                <Separator/>
            </CardContent>
        </>
    );
}