import { Order } from "@/types.ts";
import { Separator } from "@/components/ui/separator.tsx";

type Props = {
    order: Order;
}

export default function OrderStatusDetail({ order }: Props) {
    return (
        <div className="space-y-5">
            <div className="flex flex-col">
                <span className="font-bold">Delivery to:</span>
                <span >{order.deliveryDetails.name}</span>
                <span >{order.deliveryDetails.address},{order.deliveryDetails.city}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold">Your Order</span>
                <ul>
                    {order.cartItems.map((cartItem,index) => (
                        <li key={index}>
                            {cartItem.name} x {cartItem.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <Separator/>
            <div className="flex flex-col">
                <span className="font-bold">Total</span>
                <span>₹{(order.totalAmount/100).toFixed(2)}</span>
            </div>
        </div>
    );
}