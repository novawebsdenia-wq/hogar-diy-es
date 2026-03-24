"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, ADSENSE_PUBLISHER_ID } from "@/lib/constants";

export function AnalyticsScripts() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cookie_consent") === "accepted") {
      setConsent(true);
    }

    const handleConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") setConsent(true);
    };
    window.addEventListener("cookie_consent_change", handleConsent);
    return () =>
      window.removeEventListener("cookie_consent_change", handleConsent);
  }, []);

  if (!consent) return null;

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','${GA_MEASUREMENT_ID}');
          `}</Script>
        </>
      )}
      {ADSENSE_PUBLISHER_ID && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
