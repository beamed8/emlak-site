import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React, { Suspense } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Mekanlar | Denge Mekan Menajerlik",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Tüm Mekanlarımız"
                description="Etkinliğiniz için mükemmel mekanı bulun. Düğünlerden toplantılara, doğum günlerinden kurumsal etkinliklere kadar her organizasyon için uygun mekan seçeneklerimizi keşfedin."
                badge="Mekanlar"
            />
            <Suspense fallback={<div className="flex justify-center items-center py-20">Loading...</div>}>
                <PropertiesListing />
            </Suspense>
        </>
    );
};

export default page;
