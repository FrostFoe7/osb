import React from "react";
import Hero from "@/components/sections/Hero";
import NoticeBanner from "@/components/sections/NoticeBanner";
import Mission from "@/components/sections/Mission";
import Activities from "@/components/sections/Activities";
import MediaCards from "@/components/sections/MediaCards";
import Donate from "@/components/sections/Donate";
import Contact from "@/components/sections/Contact";

interface HomeProps {
    onNavigate: (pageId: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div className="animate-fade-in">
            <Hero
                onDonateClick={() => onNavigate("donate")}
                onActivitiesClick={() => onNavigate("activities")}
            />
            <NoticeBanner />
            <Mission />
            <Activities />
            <MediaCards onNavigate={onNavigate} />
            <Donate />
            <Contact />
        </div>
    );
};

export default Home;
