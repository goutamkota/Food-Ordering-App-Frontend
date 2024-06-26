import { Order } from "@/types.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select.tsx";
import { ORDER_STATUS } from "@/config/order-status-config.ts";

type Props = {
    order : Order
}

export default function OrderItemCard({ order } : Props) {
    const getTime = () => {
        const orderDateTime = new Date(order.createdAt);
        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${paddedMinutes}`;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-col-4 gap-4 justify-between mb-3">
                    <div>
                        Customer Name:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Delivery Address:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.address}, {order.deliveryDetails.city}
                        </span>
                    </div>
                    <div>
                        Time:
                        <span className="ml-2 font-normal">
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Total Cost:
                        <span className="ml-2 font-normal">
                            ₹{(order.totalAmount / 100).toFixed(2)}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {order.cartItems.map((cartItem, index) => (
                        <span key={index}>
                            <Badge variant="outline" className="mr-2">
                                {cartItem.quantity}
                            </Badge>
                            {cartItem.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-1 5">
                    <Label htmlFor="status" className="mb-1">What is the status of this order?</Label>
                    <Select>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status"></SelectValue>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status, index) => (
                                <SelectItem key={index} value={status.value}>{status.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}