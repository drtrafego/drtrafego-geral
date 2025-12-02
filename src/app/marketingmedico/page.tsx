import { Metadata } from "next";
import MarketingMedicoClient from "./MarketingMedicoClient";

export const metadata: Metadata = {
  title: "Marketing Médico e Gestão de Tráfego para Clínicas | Casal do Tráfego",
  description: "Especialistas em Marketing Médico. Atraia mais pacientes particulares, fidelize sua base e fortaleça sua autoridade com estratégias digitais éticas.",
  keywords: [
    "Marketing Médico", 
    "Marketing Para Médicos", 
    "trafego pago para medicos", 
    "marketing digital para medicos", 
    "marketingmedico"
  ],
  openGraph: {
    title: "Marketing Médico Estratégico | Casal do Tráfego",
    description: "Atraia pacientes qualificados e tenha agenda cheia com nossa metodologia exclusiva para médicos e clínicas.",
    url: "https://www.casaldotrafego.com/marketingmedico",
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
            "name": "Casal do Tráfego - Marketing Médico",
            "description": "Agência especializada em marketing médico e tráfego pago para clínicas e consultórios.",
            "url": "https://www.casaldotrafego.com/marketingmedico",
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
      <MarketingMedicoClient />
    </>
  );
}
