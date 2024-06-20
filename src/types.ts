export type User = {
    _id: string;
    email: string;
    name: string;
    address: string;
    city: string;
    country: string;
}

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItems[];
    imageUrl: string;
    lastUpdate: string;
}

export type MenuItems = {
    _id: string;
    name: string;
    price: number;
}