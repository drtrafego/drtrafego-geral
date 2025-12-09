"use client";

// Vercel Force Update 2


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Outfit } from "next/font/google";
import { 
  Target, 
  Megaphone, 
  Star, 
  Bot, 
  Check, 
  X, 
  Activity,
  TrendingUp,
  Clock,
  Calendar,
  ArrowRight,
  Quote,
  Building2,
  Search,
  Smartphone,
  AlertCircle,
  ScanLine // New icon for Awareness section
} from "lucide-react";

const outfit = Outfit({ subsets: ["latin"] });

// --- Components ---

// Dark Hero Wave (Bottom)
const HeroWaveDark = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px]">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#171717"></path>
    </svg>
  </div>
);

// Footer Wave (Top of Footer)
const FooterWaveDark = () => (
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] transform scale-y-[-1]">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#171717"></path>
    </svg>
  </div>
);

export default function MarketingMedicoClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (currentEmail: string, currentPhone: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const isEmailValid = emailRegex.test(currentEmail);
    
    const phoneDigits = currentPhone.replace(/\D/g, '');
    // Validação estrita: Aceita apenas 10 (fixo) ou 11 (celular) dígitos
    const isPhoneValid = phoneDigits.length === 10 || phoneDigits.length === 11;

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
        alert('Ocorreu um erro ao enviar. Tente novamente.');
      }
    })
    .catch(error => {
      setIsLoading(false);
      alert('Erro de conexão. Verifique sua internet.');
    });
  };

  return (
    <div id="medicos-dark-page" className={`min-h-screen ${outfit.className} bg-[#121212] text-[#e2e8f0] selection:bg-[#4ade80] selection:text-[#121212]`}>
      <style jsx global>{`
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #121212;
        }
        ::-webkit-scrollbar-thumb {
          background: #292929;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #4ade80;
        }
        
        .neon-glow {
          box-shadow: 0 0 15px rgba(74, 222, 128, 0.3);
        }
        .neon-text {
          text-shadow: 0 0 10px rgba(74, 222, 128, 0.3);
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Radial Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-[#006239] opacity-20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Atraia mais pacientes, fortaleça sua presença digital e tenha sua agenda sempre cheia.
              </h1>
              <p className="text-base md:text-xl text-[#a2a2a2] max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Unimos Google, Meta e BOT humanizado para atrair pacientes qualificados, fortalecer seu nome e organizar seu fluxo de agendamentos.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-[#4ade80] hover:bg-[#3bcf75] text-[#121212] font-bold h-12 md:h-14 px-6 md:px-8 rounded-full text-base md:text-lg shadow-[0_0_15px_rgba(74,222,128,0.5)] hover:shadow-[0_0_25px_rgba(74,222,128,0.7)] transition-all duration-300">
                  <Link href="#sessao-estrategica">Quero mais pacientes qualificados</Link>
                </Button>
              </div>
            </div>
            
            {/* Right: Floating Glass Card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-square bg-[#171717]/50 backdrop-blur-xl border border-[#292929] rounded-[2rem] p-6 md:p-8 flex flex-col shadow-2xl">
                {/* Header of Card */}
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <div>
                    <p className="text-[#a2a2a2] text-xs md:text-sm">Desempenho Mensal</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Pacientes</h3>
                  </div>
                  <div className="bg-[#121212] border border-[#292929] p-2 rounded-lg">
                     <TrendingUp className="text-[#4ade80] w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                
                {/* Graph Visualization (CSS Art) */}
                <div className="flex-grow flex items-end gap-2 md:gap-4 px-2 pb-4 relative">
                   {/* Bars */}
                   <div className="w-1/5 h-[40%] bg-[#292929] rounded-t-lg relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#121212] border border-[#292929] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">32</div>
                   </div>
                   <div className="w-1/5 h-[55%] bg-[#292929] rounded-t-lg relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#121212] border border-[#292929] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">45</div>
                   </div>
                   <div className="w-1/5 h-[70%] bg-[#292929] rounded-t-lg relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#121212] border border-[#292929] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">68</div>
                   </div>
                   <div className="w-1/5 h-[85%] bg-[#292929] rounded-t-lg relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#121212] border border-[#292929] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">94</div>
                   </div>
                   <div className="w-1/5 h-[100%] bg-gradient-to-t from-[#006239] to-[#4ade80] rounded-t-lg relative shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#4ade80] text-[#121212] font-bold px-2 py-1 rounded-lg shadow-lg transform scale-100 md:scale-110 text-xs md:text-base">
                        +120
                      </div>
                   </div>
                   
                   {/* Trend Line overlay */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                      <path d="M20,180 C60,160 100,120 140,100 S200,60 260,20" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                   </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <HeroWaveDark />
      </section>

      {/* 2. SECTION 1 (Awareness) */}
      <section className="py-16 md:py-24 bg-[#171717] relative z-20">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Sua Clínica Precisa Ser Encontrada Todos os Dias
          </h2>
          <div className="text-base md:text-xl text-[#a2a2a2] leading-relaxed mb-10 space-y-4 text-left md:text-center">
            <p>
              Hoje, os pacientes pesquisam antes de agendar: sintomas, especialidades clínicas, localização e reputação.
            </p>
            <p>
              A questão é simples:
            </p>
            <div className="space-y-3 inline-block text-left">
              <div className="flex items-start gap-3">
                  <ScanLine className="w-6 h-6 text-[#4ade80] shrink-0 mt-1" />
                  <p>Quando alguém procura sua especialidade no Google… aparece você ou outra clínica?</p>
              </div>
              <div className="flex items-start gap-3">
                  <ScanLine className="w-6 h-6 text-[#4ade80] shrink-0 mt-1" />
                  <p>Sua comunicação nas redes transmite segurança, confiança e profissionalismo?</p>
              </div>
            </div>
            <p>
              Nós criamos a presença digital que sua clínica precisa para atrair pacientes que já estão procurando seus serviços.
            </p>
          </div>
          <Link href="#sessao-estrategica" className="inline-flex items-center text-[#4ade80] font-bold text-base md:text-lg hover:text-[#3bcf75] transition-colors group">
            Solicitar Sessão Estratégica Gratuita 
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 3. SECTION 2 (Who We Are) */}
      <section className="py-24 bg-[#121212] relative overflow-hidden">
         {/* Background Accents */}
         <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#006239]/10 to-transparent pointer-events-none"></div>

         <div className="container mx-auto px-6 relative z-10">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             {/* Image Left */}
             <div className="relative aspect-[2/3] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-[#292929] shadow-2xl group">
               <div className="absolute inset-0 bg-[#121212]/40 z-10 group-hover:bg-transparent transition-all duration-500"></div>
               <Image 
                 src="/imagem_institucional.jpeg"
                 alt="Casal do Tráfego Office"
                 fill
                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               />
             </div>

             {/* Text Right */}
             <div className="space-y-8">
               <h2 className="text-3xl md:text-4xl font-bold text-white">
                 Quem Somos: <br/><span className="text-[#4ade80]">Casal do Tráfego</span>
               </h2>
               <p className="text-lg text-[#a2a2a2] leading-relaxed">
                 Nós somos o Casal do Tráfego, uma agência de marketing médico especialistas para médicos, clínicas e consultórios desde 2019.
               </p>
               <ul className="space-y-4">
                 {[
                   "Trabalhamos com Google Ads + Meta Ads",
                   "Construímos posicionamento médico",
                   "Ajudamos clínicas a terem agenda cheia",
                   "Aplicamos automações e BOT humanizado",
                   "Criamos campanhas éticas, profissionais e sustentáveis"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-[#4ade80]" />
                     <span className="text-[#e2e8f0] text-lg">{item}</span>
                   </li>
                 ))}
               </ul>
               <p className="text-lg font-semibold text-white">
                Nosso foco é simples: atrair, qualificar e converter pacientes todos os dias.
               </p>
               <Button asChild size="lg" className="bg-transparent border-2 border-[#4ade80] text-[#4ade80] hover:bg-[#4ade80] hover:text-[#121212] font-bold h-12 px-8 rounded-full text-lg transition-all duration-300">
                  <Link href="#sessao-estrategica">Quero melhorar minha presença digital</Link>
               </Button>
             </div>
           </div>
         </div>
      </section>

      {/* 4. SECTION 3 (The Context) */}
      <section className="py-24 bg-[#171717]">
        <div className="container mx-auto px-6">
          {/* Enhanced Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
             {[
               { icon: Building2, label: "Fachada da sua clínica" },
               { icon: Search, label: "O maior buscador" },
               { icon: Smartphone, label: "Presença profissional" },
               { icon: Target, label: "Pacientes interessados" }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center p-6 bg-[#121212] border border-[#292929] rounded-2xl hover:border-[#4ade80] transition-all duration-300 group">
                  <div className="p-4 bg-[#292929] rounded-full text-[#4ade80] mb-4 group-hover:scale-110 transition-transform">
                      <item.icon size={32} />
                  </div>
                  <p className="font-semibold text-white text-sm md:text-base">{item.label}</p>
               </div>
             ))}
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              O Paciente Pesquisa Antes de Agendar
            </h2>
            <div className="text-lg text-[#a2a2a2] leading-relaxed space-y-6">
                <p>A internet é hoje:</p>
                
                {/* Styled List (No emojis) */}
                <div className="grid gap-3 max-w-lg mx-auto text-left">
                    <div className="flex items-center gap-3 p-3 bg-[#121212] border border-[#292929] rounded-xl hover:border-[#4ade80]/50 transition-colors">
                        <Building2 className="w-5 h-5 text-[#4ade80] shrink-0" />
                        <span className="text-[#e2e8f0]">A fachada da sua clínica</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#121212] border border-[#292929] rounded-xl hover:border-[#4ade80]/50 transition-colors">
                        <Search className="w-5 h-5 text-[#4ade80] shrink-0" />
                        <span className="text-[#e2e8f0]">O maior buscador de pacientes</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#121212] border border-[#292929] rounded-xl hover:border-[#4ade80]/50 transition-colors">
                        <Smartphone className="w-5 h-5 text-[#4ade80] shrink-0" />
                        <span className="text-[#e2e8f0]">Onde sua presença profissional é percebida</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#121212] border border-[#292929] rounded-xl hover:border-[#4ade80]/50 transition-colors">
                        <Target className="w-5 h-5 text-[#4ade80] shrink-0" />
                        <span className="text-[#e2e8f0]">Onde você aparece para pacientes interessados</span>
                    </div>
                </div>

                <p className="pt-4">
                    E quem não está presente estrategicamente… fica invisível.
                </p>
                <p>
                    Por isso, clínicas com presença digital forte crescem mais rápido, com previsibilidade e segurança, onde o ideal é contratar uma agência especialista em marketing para médicos.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 4 (Problems - Floating) */}
      <section className="py-32 bg-[#121212] relative overflow-hidden">
         {/* Organic Separator Lines (CSS Borders) */}
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#292929] to-transparent"></div>
         
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    O Que Impede Sua Clínica de Crescer
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                    "Agenda instável",
                    "Pacientes pouco qualificados",
                    "Dependência de indicações",
                    "Falta de presença no Google",
                    "Recepção sobrecarregada",
                    "Falta de posicionamento",
                    "Concorrência crescente",
                    "Comunicação inconsistente"
                ].map((problem, i) => (
                    <div key={i} className="bg-[#171717] border border-[#292929] p-6 rounded-xl flex items-center gap-4 shadow-lg hover:border-red-900/50 transition-colors">
                        <div className="bg-red-900/20 p-2 rounded-full text-red-500">
                            <AlertCircle size={20} />
                        </div>
                        <span className="font-medium text-[#e2e8f0]">{problem}</span>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <p className="text-xl font-bold text-[#4ade80]">
                    Nós resolvemos todos esses pontos com estratégia.
                </p>
            </div>
         </div>
      </section>

      {/* 6. SECTION 5 (The Solutions - 4 Cards Grid) */}
      <section className="py-24 bg-[#171717]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    O Que Fazemos (na prática)
                </h2>
                <p className="text-lg text-[#a2a2a2]">
                    Estratégias profissionais para atrair, qualificar e converter pacientes. Criamos sistemas completos de aquisição de pacientes, focados em: previsibilidade, autoridade, organização de fluxo, crescimento.
                </p>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group bg-[#121212] border border-[#292929] p-8 rounded-2xl hover:border-[#4ade80] transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[#006239] p-4 rounded-full mb-6 inline-block">
                <Target size={32} className="text-[#4ade80]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Estratégia Digital para Clínicas</h3>
              <ul className="text-sm text-[#a2a2a2] space-y-2">
                <li>– Diagnóstico completo</li>
                <li>– Posicionamento médico</li>
                <li>– Análise do paciente ideal</li>
                <li>– Estrutura que transmite autoridade</li>
                <li>– Mensagens que conectam e convertem</li>
              </ul>
            </div>
            
            {/* Card 2 */}
            <div className="group bg-[#121212] border border-[#292929] p-8 rounded-2xl hover:border-[#4ade80] transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[#006239] p-4 rounded-full mb-6 inline-block">
                <Megaphone size={32} className="text-[#4ade80]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Tráfego Pago (Google + Meta)</h3>
              <p className="text-sm text-[#a2a2a2] mb-2">Unimos o poder das duas principais plataformas para médicos:</p>
              <ul className="text-sm text-[#a2a2a2] space-y-2">
                <li><strong className="text-white">Google Ads:</strong> Pacientes em busca ativa, Leads quentes.</li>
                <li><strong className="text-white">Meta Ads:</strong> Fortalecimento de marca, Autoridade, Relacionamento.</li>
              </ul>
              <p className="text-sm text-[#a2a2a2] mt-2 italic">Essa combinação é o que gera resultados reais e previsíveis.</p>
            </div>

            {/* Card 3 */}
            <div className="group bg-[#121212] border border-[#292929] p-8 rounded-2xl hover:border-[#4ade80] transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[#006239] p-4 rounded-full mb-6 inline-block">
                <Star size={32} className="text-[#4ade80]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Branding e Autoridade Médica</h3>
              <ul className="text-sm text-[#a2a2a2] space-y-2">
                <li>– Clareza de comunicação</li>
                <li>– Posicionamento estratégico</li>
                <li>– Narrativa profissional</li>
                <li>– Percepção clara do seu diferencial como médico</li>
              </ul>
              <p className="text-sm text-[#a2a2a2] mt-2 italic">A decisão do paciente é baseada em clareza, confiança e experiência.</p>
            </div>

            {/* Card 4 */}
            <div className="group bg-[#121212] border border-[#292929] p-8 rounded-2xl hover:border-[#4ade80] transition-all duration-300 hover:-translate-y-1">
              <div className="bg-[#006239] p-4 rounded-full mb-6 inline-block">
                <Bot size={32} className="text-[#4ade80]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">4. BOT de Atendimento Humanizado</h3>
              <p className="text-sm text-[#a2a2a2] mb-2">Atendimento rápido, organizado e eficiente.</p>
              <ul className="text-sm text-[#a2a2a2] space-y-2">
                <li>✔ Responde 24 horas</li>
                <li>✔ Reduz demanda da recepção</li>
                <li>✔ Qualifica pacientes automaticamente</li>
                <li>✔ Aumenta agendamentos</li>
              </ul>
              <p className="text-sm text-[#a2a2a2] mt-2 font-semibold">Clínicas que usam BOT convertem mais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION 6 (Target Audience) */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
                Para Quem É
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
                {[
                    "Clínicas", 
                    "Consultórios", 
                    "Médicos de todas as especialidades", 
                    "Profissionais que atendem particular", 
                    "Quem quer agenda cheia", 
                    "Quem quer fortalecer a marca", 
                    "Quem quer crescer sem perder credibilidade"
                ].map((item, i) => (
                    <span key={i} className="bg-[#171717] border border-[#292929] px-6 py-3 rounded-full text-[#a2a2a2] font-medium hover:border-[#4ade80] transition-colors">
                        {item}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* 8. SECTION 7 (Testimonials) */}
      <section className="py-24 bg-[#171717]">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                O que dizem nossos parceiros
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {[
                    {
                        name: "Dra. Mariana Ribeiro",
                        role: "Dermatologista",
                        quote: "Eu já tinha Instagram, mas não conseguia transformar seguidores em pacientes. Depois da estratégia de tráfego e do BOT de atendimento, minha agenda começou a encher de forma organizada. Hoje atendo apenas o perfil de paciente que realmente busca meus procedimentos."
                    },
                    {
                        name: "Dr. Felipe Moura",
                        role: "Ortopedista",
                        quote: "Sempre tive dificuldade com marketing porque não tinha tempo para pensar nisso. O atendimento estratégico me ajudou a entender o que realmente faltava. Agora, com anúncios bem feitos e automações, recebo leads qualificados todos os dias e minha equipe não se perde no atendimento."
                    },
                    {
                        name: "Dra. Ana Paula Camargo",
                        role: "Ginecologista & Obstetra",
                        quote: "Eu já tinha investido em anúncios antes, mas sem retorno. Com o Casal do Tráfego, finalmente entendi a importância do posicionamento e do conteúdo alinhado com os anúncios. Meus agendamentos cresceram e a clínica ficou muito mais organizada."
                    },
                    {
                        name: "Dr. Ricardo Sanches",
                        role: "Cardiologista Clínico",
                        quote: "A melhor parte foi ter clareza. Eles me mostraram o que minha clínica já tinha, o que faltava e qual seria o caminho mais rápido para crescer. O BOT de atendimento também reduziu as ligações e agilizou os agendamentos. Hoje tenho previsibilidade e mais pacientes certos."
                    }
                ].map((testimonial, i) => (
                    <div key={i} className="bg-[#121212] border border-[#292929] p-8 rounded-2xl">
                        <div className="flex gap-1 mb-4">
                            {[1,2,3,4,5].map(star => (
                                <Star key={star} size={18} className="fill-[#4ade80] text-[#4ade80]" />
                            ))}
                        </div>
                        <p className="text-[#a2a2a2] italic mb-6">"{testimonial.quote}"</p>
                        <div>
                            <p className="font-bold text-white">{testimonial.name}</p>
                            <p className="text-sm text-[#4ade80] font-medium">{testimonial.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section id="sessao-estrategica" className="relative py-24 bg-gradient-to-b from-[#006239] to-[#121212] overflow-hidden">
        <FooterWaveDark />
        
        <div className="container mx-auto px-6 relative z-20 mt-12">
          <div className="max-w-4xl mx-auto bg-[#171717] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#292929]">
            <div className="grid md:grid-cols-2">
              <div className="p-12 flex flex-col justify-center relative overflow-hidden bg-[#121212]">
                {/* Decorative glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-[#4ade80] opacity-5 blur-[80px]"></div>
                
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
                      Pronto para atrair muitos pacientes nos próximos 180 dias?
                    </h2>
                    <p className="text-[#a2a2a2] mb-8">
                      Agende sua Sessão Estratégica Gratuita com o Casal do Tráfego.
                    </p>
                    <div className="flex items-center gap-4 text-[#4ade80]">
                        <div className="bg-[#4ade80]/10 p-3 rounded-full border border-[#4ade80]/20">
                            <Check size={24} />
                        </div>
                        <span className="font-medium">Análise de Presença Digital</span>
                    </div>
                </div>
              </div>
              
              <div className="p-12 bg-[#171717] border-l border-[#292929]">
                <h3 className="text-xl font-bold text-white mb-6">Receba sua análise gratuita</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Nome completo" 
                      className="h-12 rounded-xl bg-[#121212] border-[#292929] text-white placeholder:text-[#a2a2a2] focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="E-mail" 
                      className="h-12 rounded-xl bg-[#121212] border-[#292929] text-white placeholder:text-[#a2a2a2] focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="DDD + Whatsapp" 
                      className="h-12 rounded-xl bg-[#121212] border-[#292929] text-white placeholder:text-[#a2a2a2] focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={15}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-[#4ade80] hover:bg-[#3bcf75] text-[#121212] font-bold rounded-xl text-lg transition-all"
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Agendar Sessão Gratuita'}
                  </Button>
                  <p className="text-xs text-center text-[#a2a2a2] mt-4">
                    Seus dados estão seguros. Entraremos em contato em breve.
                  </p>
                </form>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mt-16">
             <p className="text-[#a2a2a2] leading-relaxed">
                A internet hoje é o que separa clínicas que crescem de clínicas que permanecem invisíveis. O Casal do Tráfego existe para colocar sua clínica na frente, com estratégia, posicionamento e campanhas profissionais. Quando sua marca é vista pelas pessoas certas todos os dias… o crescimento é inevitável.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
}
