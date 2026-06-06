import Script from "next/script";

type ProjectsCollectionJsonLdProps = {
  name: string;
  description: string;
  url: string;
};

export default function ProjectsCollectionJsonLd({
  name,
  description,
  url,
}: ProjectsCollectionJsonLdProps) {
  return (
    <Script id="projeler-collection-jsonld" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description,
        url,
        isPartOf: {
          "@type": "WebSite",
          name: "Erdem Prefabrik",
          url: "https://erdemprefabrik.com",
        },
      })}
    </Script>
  );
}
