import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React, { Suspense } from "react";
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
            <Suspense fallback={<div className="flex justify-center items-center py-20">Loading...</div>}>
                <PropertiesListing />
            </Suspense>
        </>
    );
};

export default page;
