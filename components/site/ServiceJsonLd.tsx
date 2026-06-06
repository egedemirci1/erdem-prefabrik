import Script from "next/script";

type ServiceJsonLdProps = {
  id: string;
  name: string;
  description: string;
  serviceTypes: string[];
  countryName: string;
};

export default function ServiceJsonLd({
  id,
  name,
  description,
  serviceTypes,
  countryName,
}: ServiceJsonLdProps) {
  return (
    <Script id={id} type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
          "@type": "LocalBusiness",
          name: "Erdem Prefabrik",
          url: "https://erdemprefabrik.com",
          telephone: "+90 332 351 80 60",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Fetih Mahallesi, Adana Çevreyolu Caddesi No:119",
            addressLocality: "Karatay",
            addressRegion: "Konya",
            postalCode: "42030",
            addressCountry: "TR",
          },
        },
        areaServed: { "@type": "Country", name: countryName },
        serviceType: serviceTypes,
      })}
    </Script>
  );
}
