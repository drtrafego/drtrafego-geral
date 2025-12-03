"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Manrope } from "next/font/google";
import { 
  CheckCircle2, 
  ChevronRight, 
  Quote, 
  Scale, 
  Gavel, 
  BookOpen, 
  Users, 
  TrendingUp,
  ShieldCheck,
  Globe,
  MessageSquare,
  ArrowRight,
  RotateCw,
  XCircle
} from "lucide-react";

// Using Manrope as a fallback/proxy for a modern professional sans-serif
const manrope = Manrope({ subsets: ["latin"] });

export default function AdvogadosClient() {
  // Form Logic
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (currentEmail: string, currentPhone: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const isEmailValid = emailRegex.test(currentEmail);
    
    const phoneDigits = currentPhone.replace(/\D/g, '');
    const isPhoneValid = phoneDigits.length >= 10;

    setIsFormValid(isEmailValid && isPhoneValid);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm(newEmail, phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 11) {
      input = input.substring(0, 11);
    }
    
    let formattedPhone = '';
    if (input.length > 0) {
      formattedPhone = '(' + input.substring(0, 2);
    }
    if (input.length >= 3) {
      formattedPhone += ') ' + input.substring(2, 7);
    }
    if (input.length >= 8) {
      formattedPhone += '-' + input.substring(7, 11);
    }
    
    setPhone(formattedPhone);
    validateForm(email, formattedPhone);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone }),
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/obrigado';
      } else {
        setIsLoading(false);
        response.json().then(errorData => {
          console.error('Falha na API:', errorData);
          alert('Ocorreu um erro ao enviar. Tente novamente.');
        }).catch(() => {});
      }
    })
    .catch(error => {
      setIsLoading(false);
      console.error('Erro de rede:', error);
      alert('Erro de conexão. Verifique sua internet.');
    });
  };

  return (
    <div id="advogados-page" className={`font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary`}>
      <style jsx global>{`
        #advogados-page {
          --card: 255 255 255; /* #FFFFFF */
          --ring: 131 223 168; /* #83dfa8 */
          --input: 209 213 218; /* #d1d5da */
          --muted: 238 239 241; /* #eeeff1 */
          --accent: 215 245 227; /* #d7f5e3 */
          --border: 209 213 218; /* #d1d5da */
          --radius: 0.5rem;
          --popover: 255 255 255; /* #FFFFFF */
          --primary: 10 191 83; /* #0abf53 - Converting to RGB for Tailwind opacity support if needed, but here we use hex mostly */
          
          /* Tailwind often uses HSL or straight hex. Since the user provided Hex, we map them to the CSS vars used by Shadcn */
          /* Note: Shadcn usually expects HSL values in globals.css. 
             If the project uses HSL in tailwind.config.js, direct HEX assignment might break opacity modifiers (bg-primary/20).
             However, if we just set the properties directly on the classes or assume standard usage. 
             Let's try to override the style attribute directly for exact color matching.
          */
          
          --primary: #0abf53;
          --primary-foreground: #FFFFFF;
          --background: #00112c; /* Dark Mode default for Law Page as per Copy? Or User's Light Mode? 
             User said: "Essa aqui é a paleta de cores".
             And provided .dark and :root. 
             Since "LawFor" style suggests Dark Elegance, I will default the page wrapper to the Dark theme variables provided by the user 
             or allow it to switch. 
             Let's FORCE the "Dark" look for the Hero as requested by "Copy Advogado", but using the user's "Dark" palette colors.
          */
        }
        
        /* Customizing the page specific colors based on User Input */
        #advogados-page {
            font-family: "Adyen", ${manrope.style.fontFamily}, sans-serif;
        }

        /* Section specific overrides */
        .section-dark {
            background-color: #00112c;
            color: #FFFFFF;
        }
        .section-light {
            background-color: #FFFFFF;
            color: #00112c;
        }
        .section-muted {
            background-color: #f7f7f8;
            color: #00112c;
        }
        
        .text-gold {
            color: #0abf53; /* Replacing Gold with the Primary Green as per user palette request ("use this palette") */
        }
        
        .btn-primary {
            background-color: #0abf53;
            color: #FFFFFF;
        }
        .btn-primary:hover {
            background-color: #067934;
        }
      `}</style>

      {/* 1. HERO SECTION (Dark Background) */}
      <section className="section-dark w-full pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Torne seu escritório uma referência na sua região com presença digital forte e <span className="text-[#0abf53]">estratégia qualificada.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
                Estratégia inteligente unindo Google, Meta e BOT humanizado para ampliar sua visibilidade e autoridade, atraindo leads qualificados todos os dias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#0abf53] hover:bg-[#067934] text-white text-lg px-8 py-6 rounded-lg shadow-lg transition-all">
                  <Link href="#sessao-estrategica">Quero leads qualificados</Link>
                </Button>
              </div>
            </div>
            
            {/* Floating Card */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0abf53] to-blue-600 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative bg-[#0d1e38] border border-gray-700 p-8 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#0abf53]/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#0abf53]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Resultado Estimado</p>
                    <p className="text-xl font-bold text-white">+40% em Agendamentos</p>
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#0abf53]" />
                      <span>Leads Qualificados (Não curiosos)</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#0abf53]" />
                      <span>Posicionamento de Autoridade</span>
                   </div>
                   <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#0abf53]" />
                      <span>Atendimento Automatizado</span>
                   </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                   <p className="text-white font-semibold mb-2">Pronto para crescer?</p>
                   <Link href="#sessao-estrategica" className="text-[#0abf53] hover:underline flex items-center justify-center gap-2 font-medium">
                     Agendar Diagnóstico <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1 (Intro - Awareness) */}
      <section className="section-light py-12">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#00112c]">
            Seu Escritório Precisa Ser Encontrado Todos os Dias
          </h2>
          <div className="text-lg text-gray-600 space-y-6 leading-relaxed">
            <p>
              Potenciais clientes pesquisam antes de decidir. Eles analisam nome, especialidade e reputação.
            </p>
            <p className="font-semibold text-[#00112c] text-xl">
              Se você não aparece no Google, alguém aparece no seu lugar.
            </p>
            <p>
              Não basta apenas "ter um site". É preciso uma estratégia ativa que coloque seu escritório na frente de quem precisa do seu serviço jurídico agora.
            </p>
          </div>
          <div className="mt-10">
            <Link href="#sessao-estrategica" className="text-[#0abf53] font-bold text-lg hover:underline inline-flex items-center gap-2">
              Solicitar Sessão Estratégica <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SECTION 5 (THE 4 PILLARS) */}
      <section className="section-muted py-16">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
              <Globe className="w-10 h-10 text-[#0abf53] mb-6" />
              <h3 className="text-xl font-bold text-[#00112c] mb-4">Estratégia Digital</h3>
              <div className="w-10 h-1 bg-[#0abf53] mb-4"></div>
              <p className="text-gray-600">
                Direcionamento claro, análise de mercado e definição do cliente ideal para sua área de atuação.
              </p>
            </div>

            {/* Card 2 (Highlighted - Dark) */}
            <div className="bg-[#00112c] p-8 rounded-xl shadow-xl border border-[#0abf53]/30 relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-[#0abf53] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                ESSENCIAL
              </div>
              <TrendingUp className="w-10 h-10 text-[#0abf53] mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Tráfego Pago</h3>
              <div className="w-10 h-1 bg-[#0abf53] mb-4"></div>
              <p className="text-gray-300">
                Campanhas no Google Ads e Meta Ads para captar clientes que buscam ativamente por advogados.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
              <Scale className="w-10 h-10 text-[#0abf53] mb-6" />
              <h3 className="text-xl font-bold text-[#00112c] mb-4">Branding Jurídico</h3>
              <div className="w-10 h-1 bg-[#0abf53] mb-4"></div>
              <p className="text-gray-600">
                Fortalecimento do seu nome e autoridade na região com uma comunicação profissional e ética.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
              <MessageSquare className="w-10 h-10 text-[#0abf53] mb-6" />
              <h3 className="text-xl font-bold text-[#00112c] mb-4">BOT Humanizado</h3>
              <div className="w-10 h-1 bg-[#0abf53] mb-4"></div>
              <p className="text-gray-600">
                Atendimento rápido 24h, triagem inteligente e agendamento automático para não perder leads.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION 2 (About) */}
      <section className="section-dark py-16">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
               <Image 
                 src="/imagem_institucional.jpeg"
                 alt="Casal do Tráfego - Especialistas em Marketing Jurídico"
                 fill
                 className="object-cover opacity-90 hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#00112c] via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Quem Somos: <span className="text-[#0abf53]">Casal do Tráfego</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Especialistas em estratégia digital e posicionamento para escritórios jurídicos desde 2019. Entendemos as nuances do Código de Ética da OAB e criamos campanhas que vendem sem ferir a integridade da profissão.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="bg-[#0abf53]/20 p-3 rounded-full">
                    <Gavel className="w-6 h-6 text-[#0abf53]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Autoridade Profissional</h4>
                    <p className="text-sm text-gray-400">Posicionamos você como referência.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="bg-[#0abf53]/20 p-3 rounded-full">
                    <Users className="w-6 h-6 text-[#0abf53]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Visibilidade Contínua</h4>
                    <p className="text-sm text-gray-400">Seu escritório visto por quem precisa.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="bg-[#0abf53]/20 p-3 rounded-full">
                    <MessageSquare className="w-6 h-6 text-[#0abf53]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Atendimento Organizado</h4>
                    <p className="text-sm text-gray-400">Automação que não deixa o cliente esperando.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild className="bg-[#0abf53] hover:bg-[#067934] text-white rounded-full px-8 py-6 text-lg">
                  <Link href="#sessao-estrategica">Quero crescer com estratégia</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 4 (Problems) */}
      <section className="section-light py-16">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00112c] mb-10">
                O Que Impede Seu Escritório de Avançar?
              </h2>
              <div className="space-y-6">
                {[
                  "Baixa visibilidade no Google quando pesquisam sua área",
                  "Comunicação excessivamente técnica que afasta clientes",
                  "Falta de clareza na sua especialidade jurídica",
                  "Atendimento desorganizado e demora na resposta",
                  "Concorrência crescente e desleal na sua região"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-[#f7f7f8] border border-gray-100">
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pl-4 border-l-4 border-[#0abf53]">
                <p className="text-xl font-bold text-[#00112c]">
                  Tudo isso muda com estratégia.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
               <Image 
                 src="/imagem_advogado.png"
                 alt="Advogado analisando processos digitais"
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-500"
               />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 3 & 6 (Authority Banner) */}
      <section className="bg-[#0abf53] py-10 text-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            "Presença Digital é Importante. Ser Reconhecido é Essencial."
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {["Escritórios Jurídicos", "Advogados Individuais", "Quem quer previsibilidade"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-lg font-medium bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                <CheckCircle2 className="w-5 h-5 text-white" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION 7 (Testimonials) */}
      <section className="section-muted py-16">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#00112c] text-center mb-10">
            Resultados Reais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Dr. Gustavo Leal", area: "Direito Civil", text: "Depois da estratégia, meu escritório passou a ser encontrado por quem realmente precisa." },
              { name: "Dra. Juliana Andrade", area: "Direito de Família", text: "O BOT humanizado reduziu meu tempo de atendimento e qualificou os contatos." },
              { name: "Dr. Ricardo Alencar", area: "Direito Trabalhista", text: "A união Google + Meta fez toda diferença no volume de processos mensais." },
              { name: "Dra. Fernanda Duarte", area: "Direito do Consumidor", text: "Meu escritório ganhou identidade e autoridade na cidade em poucos meses." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-[#0abf53]/30" />
                </div>
                <p className="text-gray-600 italic mb-6 flex-grow">"{t.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold text-[#00112c]">{t.name}</p>
                  <p className="text-sm text-[#0abf53] font-medium">{t.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA & FORM */}
      <section id="sessao-estrategica" className="section-dark py-16">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Pronto para fortalecer sua presença digital?
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Agende sua Sessão Estratégica Gratuita. Vamos analisar seu momento atual e desenhar o plano ideal para o seu escritório.
              </p>
              <div className="flex items-start gap-4">
                <div className="w-1 bg-[#0abf53] h-24 rounded-full"></div>
                <div className="space-y-2">
                  <p className="text-gray-300 italic">"A advocacia mudou. Quem não se adapta, perde espaço."</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0d1e38] p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Receba seu diagnóstico estratégico
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-[#00112c] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#0abf53]"
                    placeholder="Dr(a). Seu Nome"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail Profissional</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="h-12 bg-[#00112c] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#0abf53]"
                    placeholder="contato@seuescritorio.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">WhatsApp</label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="h-12 bg-[#00112c] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#0abf53]"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#0abf53] hover:bg-[#067934] text-white font-bold py-4 text-lg rounded-lg transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed h-auto min-h-[56px]"
                  disabled={!isFormValid || isLoading}
                >
                   {isLoading ? (
                     <div className="flex items-center justify-center">
                       <RotateCw className="w-6 h-6 animate-spin mr-2" />
                       Enviando...
                     </div>
                   ) : 'Receber Diagnóstico'}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Seus dados estão seguros.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
