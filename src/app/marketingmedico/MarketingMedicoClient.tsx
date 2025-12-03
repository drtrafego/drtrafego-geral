"use client";

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
  Plus, 
  Activity,
  TrendingUp,
  User,
  Building2,
  Search,
  Smartphone,
  AlertCircle
} from "lucide-react";

const outfit = Outfit({ subsets: ["latin"] });

// Wave Components
const HeroWave = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
     {/* Organic Mint Gradient Shape */}
     <svg viewBox="0 0 1440 800" className="absolute top-0 left-0 w-full h-full object-cover opacity-20" preserveAspectRatio="none">
        <path fill="#72e3ad" d="M0,192L48,213.3C96,235,192,277,288,266.7C384,256,480,192,576,181.3C672,171,768,213,864,229.3C960,245,1056,235,1152,202.7C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
     </svg>
     <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#72e3ad]/10 rounded-full blur-3xl"></div>
  </div>
);

const FooterWave = () => (
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 -z-10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[150px] transform scale-y-[-1]">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#72e3ad"></path>
    </svg>
  </div>
);

export default function MarketingMedicoClient() {
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
        alert('Ocorreu um erro ao enviar. Tente novamente.');
      }
    })
    .catch(error => {
      setIsLoading(false);
      alert('Erro de conexão. Verifique sua internet.');
    });
  };

  return (
    <div id="medicos-page" className={`min-h-screen ${outfit.className}`}>
      <style jsx global>{`
        #medicos-page {
          --background: #fcfcfc;
          --foreground: #171717; /* Headings */
          --muted-foreground: #707070; /* Body */
          --primary: #72e3ad; /* Mint */
          --primary-foreground: #1e2723; /* Dark Text on Mint */
          --secondary: #fdfdfd; /* Cards */
          --accent: #3b82f6; /* Tech Blue */
          
          background-color: var(--background);
          color: var(--foreground);
        }
        
        #medicos-page .btn-mint {
          background-color: var(--primary);
          color: var(--primary-foreground);
          border-radius: 9999px; /* Pill shape */
          font-weight: 600;
          transition: all 0.3s ease;
        }
        #medicos-page .btn-mint:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(114, 227, 173, 0.3);
        }
        
        #medicos-page .btn-outline-mint {
          background-color: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        #medicos-page .btn-outline-mint:hover {
          background-color: var(--primary);
          color: var(--primary-foreground);
        }

        #medicos-page .card-white {
          background-color: var(--secondary);
          border-radius: 1.5rem; /* rounded-3xl or 2xl */
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        
        #medicos-page .text-mint {
          color: var(--primary);
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
        <HeroWave />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#171717] leading-[1.1]">
                Atraia mais pacientes, fortaleça sua presença digital e tenha sua agenda sempre cheia.
              </h1>
              <p className="text-base md:text-xl text-[#707070] max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Unimos Google, Meta e BOT humanizado para atrair pacientes qualificados, fortalecer seu nome e organizar seu fluxo de agendamentos.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button asChild size="lg" className="btn-mint h-12 md:h-14 px-6 md:px-8 text-base md:text-lg w-full md:w-auto">
                  <Link href="#sessao-estrategica">Quero mais pacientes qualificados</Link>
                </Button>
              </div>
            </div>
            
            {/* Right: Image (Floating Dashboard/Doctor) */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0">
               <div className="relative w-full max-w-xs md:max-w-md aspect-square">
                 {/* Abstract/Placeholder Illustration mimicking "Doctor holding tablet" */}
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-[2rem] md:rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden border border-gray-100">
                    <User className="w-24 h-24 md:w-32 md:h-32 text-blue-100" />
                    
                    {/* Floating UI Element 1 */}
                    <div className="absolute top-6 md:top-10 right-0 md:right-[-20px] bg-white p-3 md:p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce duration-[3000ms] scale-90 md:scale-100 z-10">
                        <div className="bg-[#72e3ad] p-2 rounded-full text-[#1e2723]">
                            <Activity size={16} className="md:w-5 md:h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-400 font-bold">Novos Pacientes</p>
                            <p className="text-base md:text-lg font-bold text-[#171717]">+24%</p>
                        </div>
                    </div>

                    {/* Floating UI Element 2 */}
                    <div className="absolute bottom-6 md:bottom-10 left-0 md:left-[-20px] bg-white p-3 md:p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-pulse scale-90 md:scale-100 z-10">
                        <div className="bg-blue-500 p-2 rounded-full text-white">
                            <TrendingUp size={16} className="md:w-5 md:h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-gray-400 font-bold">Retorno ROI</p>
                            <p className="text-base md:text-lg font-bold text-[#171717]">5.8x</p>
                        </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1 (Awareness) */}
      <section className="py-12 lg:py-20 bg-[#fdfdfd]">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold text-[#171717] mb-6">
            Sua Clínica Precisa Ser Encontrada Todos os Dias
          </h2>
          <div className="text-lg md:text-xl text-[#707070] leading-relaxed mb-10 space-y-4 text-left md:text-center">
            <p>
              Hoje, os pacientes pesquisam antes de agendar: sintomas, especialidades clínicas, localização e reputação.
            </p>
            <p>
              A questão é simples:
            </p>
            <div className="bg-gray-50 p-4 rounded-xl md:bg-transparent md:p-0">
                <p className="mb-2">
                👉 Quando alguém procura sua especialidade no Google… aparece você ou outra clínica?
                </p>
                <p>
                👉 Sua comunicação nas redes transmite segurança, confiança e profissionalismo?
                </p>
            </div>
            <p>
              Nós criamos a presença digital que sua clínica precisa para atrair pacientes que já estão procurando seus serviços.
            </p>
          </div>
          <Link href="#sessao-estrategica" className="inline-flex items-center text-[#72e3ad] font-bold text-lg hover:underline group">
            Solicitar Sessão Estratégica Gratuita 
            <span className="ml-2 transition-transform group-hover:translate-x-1">-></span>
          </Link>
        </div>
      </section>

      {/* 3. SECTION 2 (Who We Are) */}
      <section className="py-12 lg:py-20 relative overflow-hidden bg-[#fcfcfc]">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
           <Plus className="absolute top-20 left-10 text-[#72e3ad]/30 w-8 h-8" />
           <Plus className="absolute bottom-20 right-10 text-[#72e3ad]/30 w-12 h-12" />
           <Plus className="absolute top-1/2 right-1/4 text-[#72e3ad]/20 w-6 h-6" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image Left */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-square lg:aspect-[4/5] bg-gray-50 order-2 lg:order-1">
               <Image 
                 src="/imagem_institucional.jpeg"
                 alt="Casal do Tráfego"
                 fill
                 className="object-cover"
               />
            </div>

            {/* Text Right */}
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <h2 className="text-2xl md:text-4xl font-bold text-[#171717]">
                Quem Somos: <br />Casal do Tráfego
              </h2>
              <p className="text-base md:text-lg text-[#707070] leading-relaxed">
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
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-[#72e3ad] rounded-full p-1 text-[#1e2723] flex-shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-sm md:text-base text-[#707070]">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base md:text-lg font-semibold text-[#171717]">
                Nosso foco é simples: atrair, qualificar e converter pacientes todos os dias.
              </p>
              <Button asChild size="lg" className="btn-outline-mint h-12 px-8 text-base md:text-lg w-full md:w-auto">
                <Link href="#sessao-estrategica">Quero melhorar minha presença digital</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3 (The Context) */}
      <section className="py-12 lg:py-20 bg-[#fdfdfd]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
             <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-[#72e3ad]/10 rounded-full text-[#72e3ad]">
                    <Building2 size={24} className="md:w-8 md:h-8" />
                </div>
                <p className="font-semibold text-[#171717] text-sm md:text-base">Fachada da sua clínica</p>
             </div>
             <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-[#72e3ad]/10 rounded-full text-[#72e3ad]">
                    <Search size={24} className="md:w-8 md:h-8" />
                </div>
                <p className="font-semibold text-[#171717] text-sm md:text-base">O maior buscador</p>
             </div>
             <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-[#72e3ad]/10 rounded-full text-[#72e3ad]">
                    <Smartphone size={24} className="md:w-8 md:h-8" />
                </div>
                <p className="font-semibold text-[#171717] text-sm md:text-base">Presença profissional</p>
             </div>
             <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-[#72e3ad]/10 rounded-full text-[#72e3ad]">
                    <Target size={24} className="md:w-8 md:h-8" />
                </div>
                <p className="font-semibold text-[#171717] text-sm md:text-base">Pacientes interessados</p>
             </div>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-[#171717]">
              O Paciente Pesquisa Antes de Agendar
            </h2>
            <div className="text-lg text-[#707070] leading-relaxed space-y-4 text-left md:text-center">
                <p>A internet é hoje:</p>
                <ul className="text-left max-w-md mx-auto space-y-2 pl-4">
                    <li>🏙️ a fachada da sua clínica</li>
                    <li>🔎 o maior buscador de pacientes</li>
                    <li>📱 onde sua presença profissional é percebida</li>
                    <li>🎯 onde você aparece para pacientes realmente interessados</li>
                </ul>
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

      {/* 5. SECTION 4 (The Problems) */}
      <section className="py-12 lg:py-20 bg-[#fcfcfc] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-bold text-[#171717]">
                    O Que Impede Sua Clínica de Crescer
                </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
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
                    <div key={i} className="card-white p-6 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow">
                        <div className="bg-red-50 p-2 rounded-full text-red-500 flex-shrink-0">
                            <AlertCircle size={20} />
                        </div>
                        <span className="font-medium text-[#171717]">{problem}</span>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-12">
                <p className="text-lg md:text-xl font-bold text-[#72e3ad]">
                    Nós resolvemos todos esses pontos com estratégia.
                </p>
            </div>
        </div>
      </section>

      {/* 6. SECTION 5 (The Solutions - 4 Cards Grid) */}
      <section className="py-12 lg:py-20 bg-[#fdfdfd]">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold text-[#171717] mb-4">
                    O Que Fazemos (na prática)
                </h2>
                <p className="text-base md:text-lg text-[#707070]">
                    Estratégias profissionais para atrair, qualificar e converter pacientes. Criamos sistemas completos de aquisição de pacientes, focados em: previsibilidade, autoridade, organização de fluxo, crescimento.
                </p>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="card-white p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#72e3ad]/20 p-4 rounded-full mb-6 text-[#1e2723]">
                <Target size={32} className="text-[#72e3ad] stroke-[2.5px]" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">1. Estratégia Digital para Clínicas</h3>
              <ul className="text-sm text-[#707070] space-y-2">
                <li>– Diagnóstico completo</li>
                <li>– Posicionamento médico</li>
                <li>– Análise do paciente ideal</li>
                <li>– Estrutura que transmite autoridade</li>
                <li>– Mensagens que conectam e convertem</li>
              </ul>
            </div>
            
            {/* Card 2 */}
            <div className="card-white p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#72e3ad]/20 p-4 rounded-full mb-6 text-[#1e2723]">
                <Megaphone size={32} className="text-[#72e3ad] stroke-[2.5px]" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">2. Tráfego Pago (Google + Meta)</h3>
              <p className="text-sm text-[#707070] mb-2">Unimos o poder das duas principais plataformas para médicos:</p>
              <ul className="text-sm text-[#707070] space-y-2">
                <li><strong>Google Ads:</strong> Pacientes em busca ativa, Leads quentes.</li>
                <li><strong>Meta Ads:</strong> Fortalecimento de marca, Autoridade, Relacionamento.</li>
              </ul>
              <p className="text-sm text-[#707070] mt-2 italic">Essa combinação é o que gera resultados reais e previsíveis.</p>
            </div>

            {/* Card 3 */}
            <div className="card-white p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#72e3ad]/20 p-4 rounded-full mb-6 text-[#1e2723]">
                <Star size={32} className="text-[#72e3ad] stroke-[2.5px]" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">3. Branding e Autoridade Médica</h3>
              <ul className="text-sm text-[#707070] space-y-2">
                <li>– Clareza de comunicação</li>
                <li>– Posicionamento estratégico</li>
                <li>– Narrativa profissional</li>
                <li>– Percepção clara do seu diferencial como médico</li>
              </ul>
              <p className="text-sm text-[#707070] mt-2 italic">A decisão do paciente é baseada em clareza, confiança e experiência.</p>
            </div>

            {/* Card 4 */}
            <div className="card-white p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-[#72e3ad]/20 p-4 rounded-full mb-6 text-[#1e2723]">
                <Bot size={32} className="text-[#72e3ad] stroke-[2.5px]" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3">4. BOT de Atendimento Humanizado</h3>
              <p className="text-sm text-[#707070] mb-2">Atendimento rápido, organizado e eficiente.</p>
              <ul className="text-sm text-[#707070] space-y-2">
                <li>✔ Responde 24 horas</li>
                <li>✔ Reduz demanda da recepção</li>
                <li>✔ Qualifica pacientes automaticamente</li>
                <li>✔ Aumenta agendamentos</li>
              </ul>
              <p className="text-sm text-[#707070] mt-2 font-semibold">Clínicas que usam BOT convertem mais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION 6 (Target Audience) */}
      <section className="py-12 lg:py-20 bg-[#fcfcfc]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-[#171717] mb-8 md:mb-12">
                Para Quem É
            </h2>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {[
                    "Clínicas", 
                    "Consultórios", 
                    "Médicos de todas as especialidades", 
                    "Profissionais que atendem particular", 
                    "Quem quer agenda cheia", 
                    "Quem quer fortalecer a marca", 
                    "Quem quer crescer sem perder credibilidade"
                ].map((item, i) => (
                    <span key={i} className="bg-white border border-gray-200 px-4 py-2 md:px-6 md:py-3 rounded-full text-[#707070] font-medium shadow-sm text-sm md:text-base">
                        {item}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* 8. SECTION 7 (Testimonials) */}
      <section className="py-12 lg:py-20 bg-[#fdfdfd]">
        <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-4xl font-bold text-[#171717] mb-8 md:mb-12 text-center">
                O que dizem nossos parceiros
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
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
                    <div key={i} className="card-white p-6 md:p-8">
                        <div className="flex gap-1 mb-4">
                            {[1,2,3,4,5].map(star => (
                                <Star key={star} size={18} className="fill-[#72e3ad] text-[#72e3ad]" />
                            ))}
                        </div>
                        <p className="text-[#707070] italic mb-6 text-sm md:text-base">"{testimonial.quote}"</p>
                        <div>
                            <p className="font-bold text-[#171717]">{testimonial.name}</p>
                            <p className="text-sm text-[#72e3ad] font-medium">{testimonial.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section id="sessao-estrategica" className="py-12 lg:py-20 relative bg-[#fcfcfc] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center bg-[#171717] text-white relative overflow-hidden">
                {/* Decorative wave for the card */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                     <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#72e3ad" />
                     </svg>
                </div>
                
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">
                      Pronto para atrair muitos pacientes nos próximos 180 dias?
                    </h2>
                    <p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base">
                      Agende sua Sessão Estratégica Gratuita com o Casal do Tráfego.
                    </p>
                    <div className="flex items-center gap-4 text-[#72e3ad]">
                        <div className="bg-[#72e3ad]/20 p-3 rounded-full flex-shrink-0">
                            <Check size={20} className="md:w-6 md:h-6" />
                        </div>
                        <span className="font-medium text-sm md:text-base">Análise de Presença Digital</span>
                    </div>
                </div>
              </div>
              
              <div className="p-6 md:p-12 bg-white">
                <h3 className="text-xl font-bold text-[#171717] mb-6">Receba sua análise gratuita</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Nome completo" 
                      className="h-12 rounded-xl bg-gray-50 border-gray-200"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="E-mail" 
                      className="h-12 rounded-xl bg-gray-50 border-gray-200"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="WhatsApp (com DDD)" 
                      className="h-12 rounded-xl bg-gray-50 border-gray-200"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={15}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 btn-mint text-lg"
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Agendar Sessão Gratuita'}
                  </Button>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    Seus dados estão seguros. Entraremos em contato em breve.
                  </p>
                </form>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mt-12 md:mt-16">
             <p className="text-[#707070] leading-relaxed text-sm md:text-base">
                A internet hoje é o que separa clínicas que crescem de clínicas que permanecem invisíveis. O Casal do Tráfego existe para colocar sua clínica na frente, com estratégia, posicionamento e campanhas profissionais. Quando sua marca é vista pelas pessoas certas todos os dias… o crescimento é inevitável.
             </p>
          </div>
        </div>
      </section>
      
      {/* Footer Wave Decoration */}
      <div className="relative h-16 md:h-24 overflow-hidden">
         <FooterWave />
      </div>
    </div>
  );
}
