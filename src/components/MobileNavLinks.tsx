import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "@/components/ui/separator.tsx";

export default function MobileNavLinks() {
    const { logout } = useAuth0()
    return (
        <>
            <Link to="/user-profile" className="flex bg-white items-center font-bold hover:text-orange-500">
                User Profile
            </Link>
            <Link to="/order-status" className="flex bg-white items-center font-bold hover:text-orange-500">
                Order Status
            </Link>
            <Link to="/manage-restaurant" className="flex bg-white items-center font-bold hover:text-orange-500">
                Manage Restaurant
            </Link>
            <Separator />
            <Button className="flex items-center font-bold hover:bg-gray-500 px-3" onClick={()=> logout()}>
                Log Out
            </Button>
        </>
    );
}