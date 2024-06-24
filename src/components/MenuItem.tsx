import { MenuItem as MenuItemType } from "@/types.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

type Props = {
    menuItem : MenuItemType;
    addToCart : () => void;
}

export default function MenuItem({ menuItem, addToCart } : Props) {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                ₹{menuItem.price}
            </CardContent>
        </Card>
    );
}