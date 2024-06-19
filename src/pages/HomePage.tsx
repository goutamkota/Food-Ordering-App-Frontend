import landingImg from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";

export default function HomePage() {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 gap-5 text-center -mt-16">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeaway today
                </h1>
                <span className="text-xl">Food is just a click away!</span>
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