import { ReactNode } from "react";
import Header from "@/components/Header.tsx";
import Hero from "@/components/Hero.tsx";
import Footer from "@/components/Footer.tsx";

type Props = {
    children : ReactNode;
    showHero? : boolean;
}

export default function Layout({ children, showHero = false } : Props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            {showHero && <Hero/>}
            <div className="container mx-auto flex-1 py-6 md:py-10">{children}</div>
            <Footer/>
        </div>
    );
}