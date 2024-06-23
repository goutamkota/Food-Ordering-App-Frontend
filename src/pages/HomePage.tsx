import landingImg from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar.tsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const handleSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        })
    }
    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg flex flex-col shadow-md py-8 gap-3 text-center -mt-16">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeaway today
                </h1>
                <span className="text-xl mb-3">Food is just a click away!</span>
                <SearchBar placeholder="Search by City or Town" onSubmit={handleSubmit}/>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImg} alt="landing image"/>
                <div className="flex flex-col gap-4 items-center justify-center text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster!
                    </span>
                    <span>
                        Download the MernEats App for faster ordering and personalized recommendations!
                    </span>
                    <img src={appDownload} alt="download button"/>
                </div>
            </div>
        </div>
    );
}