import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Property List | Homely",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Mekanlar"
                description="İlham veren tasarımlara sahip mekanları keşfedin. Zarafet ve konforu bir arada sunan, seçkin yaşam alanlarımızı inceleyin."
                badge="Mekanlar"
            />
            <PropertiesListing />
        </>
    );
};

export default page;
