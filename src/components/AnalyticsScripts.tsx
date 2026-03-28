"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/constants";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

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

  // Consent Mode v2: notify Google when consent is granted
  useEffect(() => {
    if (!consent || typeof window.gtag !== "function") return;
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  }, [consent]);

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
    </>
  );
}
