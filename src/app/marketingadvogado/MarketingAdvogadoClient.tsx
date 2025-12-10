"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { 
  CheckCircle2, 
  ChevronRight, 
  Quote, 
  TrendingUp,
  ArrowRight,
  RotateCw,
  XCircle,
  Check,
  Menu,
  X,
  Gavel,
  Users,
  MessageSquare
} from "lucide-react";
import PhoneInputWithFlag from "@/components/PhoneInputWithFlag";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function AdvogadosClient() {
  // Form Logic
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPhoneValidState, setIsPhoneValidState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (currentEmail: string, currentIsPhoneValid: boolean) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const isEmailValid = emailRegex.test(currentEmail);
    setIsFormValid(isEmailValid && currentIsPhoneValid);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm(newEmail, isPhoneValidState);
  };

  const handlePhoneChange = (value: string, isValid: boolean) => {
    setPhone(value);
    setIsPhoneValidState(isValid);
    validateForm(email, isValid);
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
    <div className={`${inter.className} bg-[#0f172a] text-slate-50`}>
      
      {/* 1. HERO SECTION (Dark & Cinematic) */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
         {/* Background Image/Blur */}
         <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[#0f172a]/90 z-10"></div>
         </div>

         <div className="container relative z-20 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               {/* Left: Text */}
               <div className="space-y-8">
                  <h1 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight`}>
                     Torne seu escritório uma referência na sua região com presença digital forte, posicionamento estratégico e atraia leads qualificados todos os dias.
                  </h1>
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl">
                     Estratégia inteligente unindo Google, Meta e BOT humanizado para ampliar sua visibilidade, transmitir autoridade e profissionalizar seu fluxo de atendimento.
                  </p>
                  <Button asChild size="lg" className="bg-[#0abf53] hover:bg-[#067934] text-white text-lg px-8 py-6 rounded-lg shadow-lg transition-all h-auto">
                    <Link href="#sessao-estrategica">Quero leads qualificados</Link>
                  </Button>
               </div>

               {/* Right: Floating Glass Card */}
               <div className="relative flex justify-center lg:justify-end">
                   <div className="relative w-full max-w-md bg-[#1e293b]/80 backdrop-blur-md border border-[#0abf53]/30 p-8 rounded-2xl shadow-2xl">
                       <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 bg-[#0abf53]/20 rounded-full flex items-center justify-center">
                               <TrendingUp className="w-6 h-6 text-[#0abf53]" />
                           </div>
                           <div>
                               <p className="text-sm text-slate-400">Resultado Estimado</p>
                               <p className="text-xl font-bold text-white">+40% em Agendamentos</p>
                           </div>
                       </div>
                       <div className="space-y-4 border-t border-slate-700/50 pt-6">
                           <div className="flex items-center gap-3 text-slate-300">
                               <CheckCircle2 className="w-5 h-5 text-[#0abf53]" />
                               <span>Leads Qualificados (Não curiosos)</span>
                           </div>
                           <div className="flex items-center gap-3 text-slate-300">
                               <CheckCircle2 className="w-5 h-5 text-[#0abf53]" />
                               <span>Posicionamento de Autoridade</span>
                           </div>
                           <div className="flex items-center gap-3 text-slate-300">
                               <CheckCircle2 className="w-5 h-5 text-[#0abf53]" />
                               <span>Atendimento Automatizado</span>
                           </div>
                       </div>
                       <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
                           <p className="text-white font-semibold mb-2">Pronto para crescer?</p>
                           <Link href="#sessao-estrategica" className="text-[#0abf53] hover:text-[#067934] font-medium flex items-center justify-center gap-2 transition-colors">
                               Agendar Diagnóstico <ArrowRight className="w-4 h-4" />
                           </Link>
                       </div>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* 2. SECTION 1 (Awareness - Full Detail) - Light Background */}
      <section className="py-16 md:py-24 bg-[#f5f5f4] text-slate-900">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                  <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#0f172a] mb-6`}>
                      Seu Escritório Precisa Ser Encontrada Todos os Dias
                  </h2>
                  <p className="text-lg md:text-xl text-slate-700">
                      Potenciais clientes pesquisam antes de decidir. Eles analisam:
                  </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {["nome do escritório", "especialidade", "clareza na comunicação", "conteúdos informativos", "apresentação profissional", "primeira impressão digital"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                          <Check className="w-5 h-5 text-[#0abf53]" />
                          <span className="font-medium text-slate-800">{item}</span>
                      </div>
                  ))}
              </div>

              <div className="text-center space-y-6 max-w-3xl mx-auto">
                  <p className="text-lg text-slate-700">
                      Essa análise acontece antes de qualquer contato.
                      <br /><span className="font-bold text-[#0f172a]">Se você não aparece no Google, alguém aparece no seu lugar.</span>
                      <br /><span className="font-bold text-[#0f172a]">Se sua presença digital não transmite autoridade, alguém transmite.</span>
                  </p>
                  <p className="text-lg text-slate-700">
                      Escritórios com presença digital forte têm mais oportunidades, mais previsibilidade e maior reconhecimento na região.
                  </p>
                  <div className="pt-8">
                      <Button asChild size="lg" className="bg-[#0abf53] hover:bg-[#067934] text-white px-8 py-6 rounded-lg text-lg shadow-lg h-auto">
                          <Link href="#sessao-estrategica">Solicitar Sessão Estratégica</Link>
                      </Button>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. SECTION 2 (About - Casal do Tráfego) - Dark Background */}
      <section className="py-16 md:py-24 bg-[#0f172a]">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Image Left */}
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                      <Image 
                        src="/imagem_institucional.jpeg" 
                        alt="Casal do Tráfego" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                  </div>
                  
                  {/* Text Right */}
                  <div className="space-y-8">
                      <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white`}>
                          Quem Somos: <span className="text-[#0abf53]">Casal do Tráfego</span>
                      </h2>
                      <p className="text-lg text-slate-300">
                          Somos o Casal do Tráfego, especialistas em estratégia digital e posicionamento para escritórios jurídicos desde 2019.
                      </p>
                      <p className="text-lg text-slate-300">
                          Construímos presença digital com foco em:
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {["Autoridade profissional", "Clareza na especialidade", "Visibilidade contínua", "Google + Meta atuando em conjunto", "BOT humanizado para organizar o atendimento", "Branding jurídico sólido"].map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-300">
                                  <CheckCircle2 className="w-5 h-5 text-[#0abf53] shrink-0 mt-1" />
                                  <span>{item}</span>
                              </li>
                          ))}
                      </ul>
                      <div className="border-l-4 border-[#0abf53] pl-6 py-2">
                          <p className="text-white italic">
                              Não trabalhamos com promessas, trabalhamos com estratégia, ética e posicionamento.
                              <br />Nosso objetivo é criar uma presença digital que fortalece seu nome e abre novas oportunidades de forma contínua.
                          </p>
                      </div>
                      <Button asChild className="bg-[#0abf53] hover:bg-[#067934] text-white rounded-lg px-8 py-6 text-lg h-auto">
                          <Link href="#sessao-estrategica">Quero crescer com estratégia</Link>
                      </Button>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. SECTION 3 (Authority Argument) - Dark Surface */}
      <section className="py-16 bg-[#1e293b] border-y border-slate-800">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
              <div className="text-center mb-12">
                  <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-6`}>
                      Presença Digital é Importante. Ser Reconhecido é Essencial.
                  </h2>
                  <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                      Não basta aparecer: é preciso comunicar como seu escritório atua, qual é seu diferencial e por que você é a escolha certa.
                      <br />A percepção do cliente sobre o seu escritório é formada, principalmente, por:
                  </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-[#0f172a] p-8 rounded-xl border border-slate-700">
                      <ul className="space-y-4">
                          {["a especialidade apresentada", "a clareza da comunicação", "a forma como você se posiciona", "a impressão transmitida logo de início"].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-slate-300">
                                  <div className="w-2 h-2 bg-[#0abf53] rounded-full"></div>
                                  <span>{item}</span>
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="bg-[#0f172a] p-8 rounded-xl border border-slate-700 flex flex-col justify-center">
                      <p className="text-white font-bold mb-4">Quando esses elementos trabalham juntos, o seu escritório:</p>
                      <ul className="space-y-3">
                          {["deixa de disputar atenção", "passa a inspirar segurança", "se diferencia naturalmente", "é reconhecido como referência na região"].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-[#0abf53]">
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span>{item}</span>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>

              <div className="text-center">
                  <p className="text-xl text-white font-medium">
                      Uma marca jurídica forte não apenas melhora sua presença digital, ela abre portas, aumenta oportunidades e posiciona seu escritório acima da concorrência em um mercado cada vez mais competitivo.
                  </p>
              </div>
          </div>
      </section>

      {/* 5. SECTION 4 (Problems) - Light Background */}
      <section className="py-16 md:py-24 bg-[#f5f5f4]">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                  <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#0f172a] mb-4`}>
                      O Que Impede Seu Escritório de Avançar
                  </h2>
                  <p className="text-lg text-slate-600">Os principais desafios de escritórios hoje:</p>
              </div>

              <div className="grid gap-4 mb-12">
                  {["Baixa visibilidade no Google", "Comunicação excessivamente técnica", "Falta de clareza na especialidade", "Presença digital inconsistente", "Concorrência crescente e pouco diferenciada", "Falta de previsibilidade de oportunidades", "Atendimento desorganizado"].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                          <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                          <span className="text-lg text-slate-800">{item}</span>
                      </div>
                  ))}
              </div>

              <div className="text-center bg-white p-8 rounded-xl border border-[#0abf53]/30 shadow-lg">
                  <p className={`${playfair.className} text-2xl font-bold text-[#0abf53]`}>
                      Tudo isso muda com estratégia, posicionamento e presença digital bem construída.
                  </p>
              </div>
          </div>
      </section>

      {/* 6. SECTION 5 (Services - Detailed Grid) - Dark Background */}
      <section className="py-16 md:py-24 bg-[#0f172a]">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 hover:border-[#0abf53]/50 transition-colors">
                      <h3 className={`${playfair.className} text-xl font-bold text-white mb-6`}>1. Estratégia Digital Jurídica Completa</h3>
                      <ul className="space-y-3 text-slate-300">
                          <li>– Direcionamento claro</li>
                          <li>– Posicionamento por especialidade</li>
                          <li>– Construção da marca jurídica</li>
                          <li>– Mensagens alinhadas ao perfil de cliente ideal</li>
                          <li>– Plano de presença digital contínua</li>
                      </ul>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 hover:border-[#0abf53]/50 transition-colors">
                      <h3 className={`${playfair.className} text-xl font-bold text-white mb-6`}>2. Tráfego Pago (Google + Meta)</h3>
                      <div className="text-slate-300 space-y-4 text-sm">
                          <p>A união das duas principais plataformas para o mercado jurídico:</p>
                          <div>
                              <p className="font-bold text-white mb-1">Google Ads — Busca Ativa</p>
                              <ul className="space-y-1 pl-2">
                                  <li>✔ Você aparece quando alguém procura sua especialidade</li>
                                  <li>✔ Gera contatos alinhados</li>
                                  <li>✔ Chega primeiro ao potencial cliente</li>
                              </ul>
                          </div>
                          <div>
                              <p className="font-bold text-white mb-1">Meta Ads — Autoridade e Presença</p>
                              <ul className="space-y-1 pl-2">
                                  <li>✔ Clareza da atuação</li>
                                  <li>✔ Construção de marca</li>
                                  <li>✔ Relacionamento constante</li>
                                  <li>✔ Percepção profissional</li>
                              </ul>
                          </div>
                          <p className="italic text-slate-400 pt-2">Essa combinação aumenta visibilidade e gera oportunidades com consistência.</p>
                      </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 hover:border-[#0abf53]/50 transition-colors">
                      <h3 className={`${playfair.className} text-xl font-bold text-white mb-6`}>3. Branding Jurídico</h3>
                      <ul className="space-y-3 text-slate-300">
                          <li>– Nome do escritório bem posicionado</li>
                          <li>– Especialidade apresentada com clareza</li>
                          <li>– Comunicação alinhada ao tom jurídico</li>
                          <li>– Presença forte e diferenciada</li>
                          <li>– Percepção de autoridade</li>
                      </ul>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 hover:border-[#0abf53]/50 transition-colors">
                      <h3 className={`${playfair.className} text-xl font-bold text-white mb-6`}>4. BOT Humanizado de Atendimento</h3>
                      <ul className="space-y-3 text-slate-300">
                          <li>✔ Atendimento rápido</li>
                          <li>✔ Triagem inteligente</li>
                          <li>✔ Organização de contatos</li>
                          <li>✔ Redução de demandas improdutivas</li>
                          <li>✔ Mais eficiência para o escritório</li>
                          <li>✔ Melhor experiência para o cliente</li>
                      </ul>
                      <p className="mt-4 text-slate-400 text-sm italic">O BOT é um diferencial que poucos escritórios utilizam e quem usa já está à frente.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* 7. SECTION 6 (Target Audience) */}
      <section className="py-16 bg-[#1e293b] border-t border-slate-800">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto text-center">
              <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-12`}>
                  Para Quem É
              </h2>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {["Escritórios jurídicos", "Advogados individuais", "Profissionais que desejam posicionamento", "Escritórios que buscam previsibilidade", "Advogados que querem autoridade digital", "Quem quer mais oportunidades qualificadas"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#0f172a] border border-slate-700 px-6 py-3 rounded-full text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-[#0abf53]" />
                          <span>{item}</span>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 8. SECTION 7 (Testimonials) - Light Background */}
      <section className="py-16 md:py-24 bg-[#f5f5f4]">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                      { name: "Dr. Gustavo Leal", area: "Direito Civil", text: "Depois da estratégia, meu escritório passou a ser encontrado por pessoas realmente interessadas. Muito mais organização e previsibilidade." },
                      { name: "Dra. Juliana Andrade", area: "Direito de Família", text: "O BOT humanizado reduziu meu tempo com atendimentos repetitivos. Minha comunicação ficou mais clara e meu nome mais forte na região." },
                      { name: "Dr. Ricardo Alencar", area: "Trabalhista", text: "A união Google + Meta fez toda diferença. Foi a primeira vez que tive oportunidades consistentes vindas do digital." },
                      { name: "Dra. Fernanda Duarte", area: "Consumidor", text: "Meu escritório ganhou identidade e posicionamento. Hoje sou muito mais encontrada na minha área de atuação." }
                  ].map((t, i) => (
                      <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                          <div className="mb-4 text-[#0abf53]">
                              <Quote className="w-8 h-8 opacity-50" />
                          </div>
                          <p className="text-slate-700 italic mb-6 min-h-[80px]">"{t.text}"</p>
                          <div className="border-t border-slate-100 pt-4">
                              <p className="font-bold text-[#0f172a]">{t.name}</p>
                              <p className="text-sm text-slate-500">{t.area}</p>
                          </div>
                      </div>
                  ))}
             </div>
          </div>
      </section>

      {/* 9. FINAL CTA & FORM */}
      <section id="sessao-estrategica" className="py-16 md:py-24 bg-[#0f172a] border-t border-slate-800">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
              <h2 className={`${playfair.className} text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight`}>
                  Pronto para fortalecer sua presença digital e atrair oportunidades qualificadas todos os dias?
              </h2>
              
              <div className="mt-12 bg-[#1e293b] p-8 md:p-12 rounded-2xl border border-slate-700 shadow-2xl max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-8">Receba seu diagnóstico estratégico gratuito</h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="text-left">
                          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Nome completo</label>
                          <Input 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite seu nome" 
                            className="bg-[#0f172a] border-slate-600 text-white placeholder:text-slate-500" 
                            required
                          />
                      </div>
                      <div className="text-left">
                          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">E-mail</label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="seu@email.com" 
                            className="bg-[#0f172a] border-slate-600 text-white placeholder:text-slate-500" 
                            required
                          />
                      </div>
                      <div className="text-left">
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">WhatsApp</label>
                          <PhoneInputWithFlag value={phone} onChange={handlePhoneChange} className="bg-[#0f172a] text-black" />
                      </div>
                      <Button type="submit" size="lg" className="w-full bg-[#0abf53] hover:bg-[#067934] text-white font-bold py-6 text-lg rounded-lg mt-4 h-auto" disabled={!isFormValid || isLoading}>
                          {isLoading ? (
                              <div className="flex items-center justify-center gap-2">
                                  <RotateCw className="w-5 h-5 animate-spin" />
                                  Enviando...
                              </div>
                          ) : "Quero fortalecer meu escritório"}
                      </Button>
                  </form>
              </div>
          </div>
      </section>

      <footer className="py-8 bg-[#020617] border-t border-slate-800 text-center text-slate-500 text-sm">
          <div className="container px-4 mx-auto">
              <p>© {new Date().getFullYear()} Casal do Tráfego. Todos os direitos reservados.</p>
          </div>
      </footer>
    </div>
  );
}
