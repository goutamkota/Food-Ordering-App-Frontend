import { Restaurant } from "@/types.ts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant
}

export default function RestaurantInfo({ restaurant }: Props) {
    return (
        <Card className="border-slate-300">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">
                    {restaurant.restaurantName}
                </CardTitle>
                <CardDescription>
                    {restaurant.city}, {restaurant.country}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap">
                {
                    restaurant.cuisines.map((cuisine, index) => (
                        <span className="flex" key={index}>
                            <span>{cuisine}</span>
                            {index < restaurant.cuisines.length - 1 && <Dot/>}
                        </span>
                    ))
                }
            </CardContent>
        </Card>
    );
}