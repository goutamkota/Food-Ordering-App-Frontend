import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi.tsx";

export default function UserProfilePage() {
    const { currentUser, isLoading : isGetLoading } = useGetMyUser();
    const { updateUser, isLoading : isUpdateLoading } = useUpdateMyUser();
    if (isGetLoading) return <span>Loading...</span>;
    if (!currentUser) return <span>Unable to Load User Profile.</span>
    return (
        <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>
    );
}