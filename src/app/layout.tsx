import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Otimização de fonte
});

export const metadata: Metadata = {
  title: "Construa Seu Sucesso | Gestão de Tráfego Pago e Estratégia Digital",
  description: "Especialistas em Tráfego Pago (Google Ads, Meta Ads) e Estratégia Digital. Aumente seu faturamento e atraia clientes qualificados. Atendimento em todo o Brasil.",
  keywords: ["tráfego pago", "gestor de tráfego", "tráfego pago instagram", "gestor de tráfego pago", "gestão de tráfego", "marketing digital", "google ads", "facebook ads", "estratégia digital"],
  authors: [{ name: "Construa Seu Sucesso" }],
  creator: "Construa Seu Sucesso",
  publisher: "Construa Seu Sucesso",
  robots: "index, follow",
  alternates: {
    canonical: "https://construaseusucesso.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://construaseusucesso.com.br",
    title: "Construa Seu Sucesso | Tráfego Pago e Estratégia",
    description: "Transforme seu negócio com tráfego pago estratégico e previsível.",
    siteName: "Construa Seu Sucesso",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Construa Seu Sucesso",
  "image": "https://construaseusucesso.com.br/og-image.jpg",
  "description": "Especialistas em Tráfego Pago e Estratégia Digital. Aumente seu faturamento com anúncios no Google e Instagram.",
  "url": "https://construaseusucesso.com.br",
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
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-[#0A091A] text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Tag Manager - Carregamento Otimizado */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PSN5VD4');
            `,
          }}
        />
        
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PSN5VD4" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
