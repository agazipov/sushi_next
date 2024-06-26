"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export function Metric() {
    const pathName = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.ym === 'function') {
            window.ym(97643557, "hit", window.location.href);
        }
    }, [pathName, searchParams]);

    return (
        <Script id="yandex-metrika" strategy="afterInteractive">
            {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
     
        ym(97643557, "init", {
            defer: true,
             clickmap:true,
             trackLinks:true,
             accurateTrackBounce:true
        });    
      `}
        </Script>
    );
}