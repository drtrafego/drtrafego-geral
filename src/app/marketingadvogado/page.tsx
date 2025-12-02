import { Metadata } from "next";
import MarketingAdvogadoClient from "./MarketingAdvogadoClient";

export const metadata: Metadata = {
  title: "Marketing Jurídico e Tráfego Pago para Advogados | Casal do Tráfego",
  description: "Especialistas em Marketing Jurídico e Tráfego Pago. Atraia clientes qualificados para seu escritório respeitando o código de ética da OAB. Estratégia validada para advogados.",
  keywords: [
    "marketing advogado",
    "marketing digital advogados",
    "marketing para advogados",
    "agencia de marketing para advogados",
    "marketing jurídico para advogados",
    "marketing digital advocacia",
    "trafego pago advogados"
  ],
  openGraph: {
    title: "Marketing Jurídico Estratégico | Casal do Tráfego",
    description: "Aumente a autoridade do seu escritório e atraia clientes qualificados com nossa metodologia exclusiva para advogados.",
    url: "https://www.casaldotrafego.com/marketingadvogado",
    type: "website",
  },
};

export default function AdvogadosPage() {
  return <MarketingAdvogadoClient />;
}
