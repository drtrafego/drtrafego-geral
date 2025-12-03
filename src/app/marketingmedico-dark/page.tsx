import { Metadata } from "next";
import MarketingMedicoDarkClient from "./MarketingMedicoDarkClient";

export const metadata: Metadata = {
  title: "Marketing Médico Premium | Casal do Tráfego",
  description: "Estratégias de alto padrão para médicos e clínicas. Atraia pacientes particulares e fortaleça sua autoridade com marketing digital exclusivo.",
  keywords: [
    "Marketing Médico Premium", 
    "Marketing Para Médicos", 
    "trafego pago para medicos", 
    "marketing digital para medicos", 
    "marketingmedico"
  ],
  openGraph: {
    title: "Marketing Médico Premium | Casal do Tráfego",
    description: "Atraia pacientes qualificados e tenha agenda cheia com nossa metodologia exclusiva para médicos e clínicas.",
    url: "https://www.casaldotrafego.com/marketingmedico-dark",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Casal do Tráfego - Marketing Médico Premium",
            "description": "Agência especializada em marketing médico de alto padrão e tráfego pago para clínicas e consultórios.",
            "url": "https://www.casaldotrafego.com/marketingmedico-dark",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Paulista, 1000",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "postalCode": "01310-100",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -23.5657,
              "longitude": -46.6513
            },
            "areaServed": {
              "@type": "Country",
              "name": "Brasil"
            }
          }),
        }}
      />
      <MarketingMedicoDarkClient />
    </>
  );
}
