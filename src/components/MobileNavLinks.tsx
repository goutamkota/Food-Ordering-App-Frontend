import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";

export default function MobileNavLinks() {
    const { logout } = useAuth0()
    return (
        <>
            <Link to="/user-profile" className="flex bg-white items-center font-bold hover:text-orange-500">
                User Profile
            </Link>
            <Button className="flex items-center font-bold hover:bg-gray-500 px-3" onClick={()=> logout()}>
                Log Out
            </Button>
        </>
    );
}