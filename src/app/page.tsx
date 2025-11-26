
"use client";
// Forçando a limpeza de cache do Vercel
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Eye, Target, TrendingUp, CheckCircle, XCircle, Store, Search, Building, Rocket, ClipboardList, ShieldCheck, Anchor, Scaling, CircleDollarSign, Building2, RotateCw, SearchX, FileText, CalendarDays, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`group relative p-8 rounded-3xl bg-slate-900/20 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-slate-900/30 hover:border-white/20 hover:-translate-y-1 ${className}`}>
    {children}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  </div>
);

const CheckListItem = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-start">
        <CheckCircle className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
        <span className="text-lg text-gray-300">{children}</span>
    </div>
);

const XListItem = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-start">
        <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-1" />
        <span className="text-lg text-gray-300">{children}</span>
    </div>
);


// Trigger Vercel deploy
export default function Home() {
  const router = useRouter();
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
    console.log('Formulário enviado. Enviando dados...');

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone }),
    })
    .then(response => {
      console.log('Resposta da API recebida. Status:', response.status);
      if (response.ok) {
        console.log('Resposta OK. Redirecionando para /obrigado...');
        window.location.href = '/obrigado';
      } else {
        setIsLoading(false);
        // Em caso de erro, loga o erro mas não impede o fluxo
        response.json().then(errorData => {
          console.error('Falha na API. Status:', response.status, 'Erro:', errorData);
        }).catch(() => {
          // Se o corpo do erro não for JSON, apenas loga o status
          console.error('Falha na API. Status:', response.status);
        });
      }
    })
    .catch(error => {
      setIsLoading(false);
      console.error('Erro de rede ou exceção no fetch:', error);
    });
  };

  return (
    <div className="text-white font-sans">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1a103c] via-[#0a091a] to-[#0a091a]" />
        <div className="absolute top-[-20rem] left-[-20rem] w-[50rem] h-[50rem] bg-purple-glow" />
        <div className="absolute bottom-[-20rem] right-[-20rem] w-[50rem] h-[50rem] bg-fuchsia-glow" />
      </div>
      
      <main className="relative z-10 flex flex-col min-h-screen bg-[#0A091A]">
        {/* Hero Section */}
        <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 relative">
            <div className="container px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 leading-normal shadow-[0_0_40px_rgba(156,39,176,0.4)] text-center md:text-left">
                        Aumente seu faturamento, atraia os clientes certos e impulsione suas vendas com presença digital estratégica.
                    </h1>
                    <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl text-center md:text-left">
                        Quando sua empresa aparece para quem realmente procura o que você faz, crescer deixa de ser sorte — e vira previsibilidade.
                    </p>
                    <div className="mt-12 flex justify-center md:justify-start">
                        <Button asChild size="lg" className="bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all duration-300 ease-in-out hover:scale-105 shadow-[0_0_30px_rgba(156,39,176,0.8)] h-auto min-h-14 py-4 px-6 md:px-10 text-lg whitespace-normal text-center">
                            <Link href="#contato">Quero aumentar meu faturamento</Link>
                        </Button>
                    </div>
                    <p className="mt-8 text-sm text-gray-400 text-center md:text-left">⭐ +50 Clientes Atendidos e Satisfeitos</p>
                </div>
            </div>
        </section>

        {/* Intro */}
        <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6 text-center max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Todos os dias, milhares de pessoas pesquisam exatamente o que você oferece.</h2>
                <p className="text-xl text-gray-300 mb-12">A pergunta é simples: elas encontram VOCÊ… ou seus concorrentes?</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg my-12">
                    <GlassCard className="p-8 flex flex-col items-center text-center">
                        <Eye className="w-12 h-12 mb-4 text-purple-400"/> 
                        <p className="font-semibold">Se a sua empresa não aparece, ela não vende.</p>
                    </GlassCard>
                    <GlassCard className="p-8 flex flex-col items-center text-center">
                        <TrendingUp className="w-12 h-12 mb-4 text-purple-400"/> 
                        <p className="font-semibold">Se não vende, não cresce.</p>
                    </GlassCard>
                    <GlassCard className="p-8 flex flex-col items-center text-center">
                        <Target className="w-12 h-12 mb-4 text-purple-400"/> 
                        <p className="font-semibold">Quem aparece estrategicamente domina o mercado.</p>
                    </GlassCard>
                </div>
                <p className="text-2xl font-semibold text-white mt-16">Nosso trabalho é garantir que seu negócio seja encontrado por quem está pronto para comprar — com <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">estratégia, dados e posicionamento.</span></p>
                <p className="text-3xl font-bold mt-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 shadow-[0_0_20px_rgba(252,211,77,0.5)]">Atenção gera faturamento.</p>
            </div>
        </section>

        {/* Quem Somos */}
        <section id="quem-somos" className="py-12 md:py-16">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">QUEM SOMOS</h2>
                        <p className="text-lg text-gray-300 mb-6">A <span className="font-bold text-white">Construa Seu Sucesso</span> é especialista em estratégia digital, tráfego pago e posicionamento, atuando desde <span className="text-purple-400 font-bold">2019</span>.</p>
                        <p className="text-lg text-gray-300 mb-8">Nossa missão é clara: <span className="font-semibold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">transformar empresas comuns em empresas de alto crescimento através de presença digital forte e tráfego inteligente.</span></p>
                        <p className="text-lg text-gray-300 mb-4 font-bold">Trabalhamos com:</p>
                        <div className="space-y-4">
                            <CheckListItem>Estratégia</CheckListItem>
                            <CheckListItem>Branding</CheckListItem>
                            <CheckListItem>Google ADS</CheckListItem>
                            <CheckListItem>Meta ADS</CheckListItem>
                            <CheckListItem>Automação e BOT</CheckListItem>
                            <CheckListItem>Narrativa estratégica</CheckListItem>
                            <CheckListItem>Análise de métricas</CheckListItem>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <GlassCard className="p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(156,39,176,0.5)]">
                            <div className="text-center">
                                <p className="text-6xl font-bold text-purple-400">2019</p>
                                <p className="text-xl text-gray-300 mt-2">Início da jornada</p>
                            </div>
                            <div className="w-px h-16 bg-white/20 mx-auto my-8"></div>
                            <div className="text-center">
                                <p className="text-6xl font-bold text-purple-400">50+</p>
                                <p className="text-xl text-gray-300 mt-2">Clientes Satisfeitos</p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>

        {/* --- SEÇÃO: POR QUE O DIGITAL (COM EFEITO DE LUZ NEON/GLOW) --- */} 
         <section className="py-24 relative overflow-hidden"> 
             {/* O "ORB" DE LUZ ROXA: Este é o elemento que cria o brilho de fundo */} 
             <div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                          w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] 
                          bg-purple-700/40 rounded-full blur-[120px] opacity-80 -z-10 pointer-events-none" 
             ></div> 
             
             <div className="relative z-10 container px-4 md:px-6 max-w-7xl mx-auto"> 
                 <div className="text-center max-w-3xl mx-auto mb-16"> 
                     <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500"> 
                         POR QUE O DIGITAL É SEU MAIOR CANAL DE CRESCIMENTO 
                     </h2> 
                     <p className="text-lg text-gray-300 mt-4">Hoje, a internet é:</p> 
                 </div> 
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
                     <GlassCard className="p-8 flex flex-col items-center text-center group"> 
                         <Smartphone className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform"/> 
                         <h3 className="text-xl font-bold text-white">A rua mais movimentada do mundo</h3> 
                     </GlassCard> 
                     
                     <GlassCard className="p-8 flex flex-col items-center text-center group"> 
                         <Search className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform"/> 
                         <h3 className="text-xl font-bold text-white">O maior buscador de soluções</h3> 
                     </GlassCard> 
                     
                     <GlassCard className="p-8 flex flex-col items-center text-center group"> 
                         <Store className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform"/> 
                         <h3 className="text-xl font-bold text-white">O shopping que nunca fecha</h3> 
                     </GlassCard> 
                     
                     <GlassCard className="p-8 flex flex-col items-center text-center group"> 
                         <Target className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform"/> 
                         <h3 className="text-xl font-bold text-white">O único lugar onde você anuncia direto para quem já procura você</h3> 
                     </GlassCard> 
                 </div> 
                 
                 <p className="text-center text-xl text-gray-300 mt-16 max-w-4xl mx-auto"> 
                     Se sua empresa não estiver aqui, estrategicamente, você está <span className="text-red-400 font-semibold">cedendo espaço para o concorrente.</span> 
                 </p> 
             </div> 
         </section>

        {/* O Problema */}
        <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">O PROBLEMA DAS EMPRESAS HOJE</h2>
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <GlassCard className="p-8 border-red-500/30">
                        <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">A maioria ainda depende de:</h3>
                        <div className="space-y-4">
                            <XListItem>Indicações</XListItem>
                            <XListItem>Postagens sem estratégia</XListItem>
                            <XListItem>Tentativa e erro</XListItem>
                            <XListItem>Achismo</XListItem>
                            <XListItem>Concorrência por preço</XListItem>
                            <XListItem>Falta de presença digital sólida</XListItem>
                        </div>
                    </GlassCard>
                    <GlassCard className="p-8 border-green-500/30">
                        <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">Enquanto outros já entenderam que:</h3>
                        <div className="space-y-4">
                            <CheckListItem>A internet é uma fonte infinita de novos clientes</CheckListItem>
                            <CheckListItem>Quem aparece com estratégia vira autoridade</CheckListItem>
                            <CheckListItem>Quem investe cresce mais rápido</CheckListItem>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>

        {/* O Que Fazemos */}
        <section id="o-que-fazemos" className="py-12 md:py-16">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">O QUE NÓS FAZEMOS</h2>
                    <p className="text-lg text-gray-300 mt-4">Criamos <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">sistemas completos de aquisição de clientes</span>, feitos para aumentar faturamento e construir previsibilidade.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <GlassCard className="p-8 flex flex-col items-center text-center hover:border-purple-400/50 transition-colors group">
                        <ClipboardList className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">1. Estratégia Digital Completa</h3>
                        <ul className="text-gray-400 space-y-2 text-left">
                            <li>- Diagnóstico</li>
                            <li>- Persona</li>
                            <li>- Posicionamento</li>
                            <li>- Mensagens que vendem</li>
                            <li>- Estrutura das campanhas</li>
                        </ul>
                    </GlassCard>
                    <GlassCard className="p-8 flex flex-col items-center text-center hover:border-purple-400/50 transition-colors group">
                        <TrendingUp className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">2. Tráfego Pago Profissional</h3>
                        <ul className="text-gray-400 space-y-2 text-left">
                            <li>- Campanhas diárias</li>
                            <li>- Testes e otimizações</li>
                            <li>- Públicos qualificados</li>
                            <li>- Métricas avançadas</li>
                        </ul>
                    </GlassCard>
                    <GlassCard className="p-8 flex flex-col items-center text-center hover:border-purple-400/50 transition-colors group">
                        <ShieldCheck className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">3. Branding e Autoridade</h3>
                        <ul className="text-gray-400 space-y-2 text-left">
                            <li>- Presença forte</li>
                            <li>- Narrativa estratégica</li>
                            <li>- Como ser lembrado</li>
                            <li>- Como ser escolhido</li>
                        </ul>
                    </GlassCard>
                    <GlassCard className="p-8 flex flex-col items-center text-center hover:border-purple-400/50 transition-colors group">
                        <Rocket className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">4. Automação & BOT (Opcional)</h3>
                        <ul className="text-gray-400 space-y-2 text-left">
                            <li>- Agentes no WhatsApp</li>
                            <li>- Qualificação automática</li>
                            <li>- Atendimento mais rápido</li>
                        </ul>
                    </GlassCard>
                </div>
            </div>
        </section>

        {/* Para Quem É */}
        <section className="py-12 md:py-16 bg-white/5">
            <div className="container px-4 md:px-6 text-center max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">PARA QUEM É</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-lg">
                    <GlassCard className="p-6 flex flex-col items-center justify-center text-center hover:border-purple-400/50 transition-colors group">
                        <CheckCircle className="w-10 h-10 mb-4 text-green-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Empresas</p>
                    </GlassCard>
                    <GlassCard className="p-6 flex flex-col items-center justify-center text-center hover:border-purple-400/50 transition-colors group">
                        <CheckCircle className="w-10 h-10 mb-4 text-green-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Prestadores de serviço</p>
                    </GlassCard>
                    <GlassCard className="p-6 flex flex-col items-center justify-center text-center hover:border-purple-400/50 transition-colors group">
                        <CheckCircle className="w-10 h-10 mb-4 text-green-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Clínicas e profissionais liberais</p>
                    </GlassCard>
                    <GlassCard className="p-6 flex flex-col items-center justify-center text-center hover:border-purple-400/50 transition-colors group">
                        <CheckCircle className="w-10 h-10 mb-4 text-green-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Negócios físicos ou online</p>
                    </GlassCard>
                </div>
                <p className="text-xl text-gray-300 mt-12">Se você busca <span className="font-bold text-white">mais clientes, mais vendas e mais faturamento</span>, essa estratégia é para você.</p>
            </div>
        </section>

        {/* A Solução */}
        <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6 text-center max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">A SOLUÇÃO COMPLETA</h2>
                <p className="text-xl text-gray-300 mb-12">Você não precisa de “likes” ou “postagens bonitas”. Você precisa de um sistema que entrega:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8 text-lg">
                    <GlassCard className="p-6 text-center flex flex-col items-center justify-center hover:border-purple-400/50 transition-colors group">
                        <Rocket className="w-10 h-10 mb-4 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Campanhas que vendem</p>
                    </GlassCard>
                    <GlassCard className="p-6 text-center flex flex-col items-center justify-center hover:border-purple-400/50 transition-colors group">
                        <ClipboardList className="w-10 h-10 mb-4 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Estratégia validada</p>
                    </GlassCard>
                    <GlassCard className="p-6 text-center flex flex-col items-center justify-center hover:border-purple-400/50 transition-colors group">
                        <ShieldCheck className="w-10 h-10 mb-4 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Marca forte</p>
                    </GlassCard>
                    <GlassCard className="p-6 text-center flex flex-col items-center justify-center hover:border-purple-400/50 transition-colors group">
                        <Anchor className="w-10 h-10 mb-4 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Posicionamento claro</p>
                    </GlassCard>
                    <GlassCard className="p-6 text-center flex flex-col items-center justify-center hover:border-purple-400/50 transition-colors group">
                        <Scaling className="w-10 h-10 mb-4 text-purple-400 group-hover:scale-110 transition-transform"/>
                        <p className="font-semibold">Crescimento previsível</p>
                    </GlassCard>
                </div>
            </div>
        </section>

        {/* Depoimentos */}
        <section className="py-12 md:py-16 bg-white/5">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">O QUE NOSSOS CLIENTES DIZEM</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <GlassCard className="p-8"><p className="text-gray-300 italic text-lg">“Finalmente deixamos de depender apenas de indicações.”</p><p className="text-right mt-4 font-bold text-purple-300">- Clínica de Estética</p></GlassCard>
                    <GlassCard className="p-8"><p className="text-gray-300 italic text-lg">“Contratamos para aumentar os agendamentos e em menos de 30 dias já tínhamos enchido a agenda da semana seguinte.”</p><p className="text-right mt-4 font-bold text-purple-300">- Dono de Barbearia</p></GlassCard>
                    <GlassCard className="p-8"><p className="text-gray-300 italic text-lg">“Tínhamos um bom produto, mas ninguém conhecia. Hoje, somos referência na nossa cidade.”</p><p className="text-right mt-4 font-bold text-purple-300">- Loja de Roupas</p></GlassCard>
                </div>
            </div>
        </section>



                {/* Seção de Contato */}
        <section id="contato" className="py-12 md:py-16 bg-black/20">
            <div className="container px-4 md:px-6 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Fale com um especialista</h2>
                    <p className="text-lg text-gray-300 mt-4">Preencha o formulário e nossa equipe entrará em contato para agendar uma conversa sem compromisso.</p>
                </div>
                <GlassCard className="p-8 md:p-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                         <div>
                             <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                             <Input id="name" name="name" type="text" placeholder="Seu nome completo" required className="bg-white/5 border-white/20 focus:ring-purple-500 focus:border-purple-500" value={name} onChange={(e) => setName(e.target.value)} />
                         </div>
                         <div>
                             <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                             <Input id="email" name="email" type="email" placeholder="seu.melhor.email@exemplo.com" required className="bg-white/5 border-white/20 focus:ring-purple-500 focus:border-purple-500" value={email} onChange={handleEmailChange} />
                         </div>
                         <div>
                             <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                             <Input id="phone" name="phone" type="tel" placeholder="(XX) XXXXX-XXXX" required className="bg-white/5 border-white/20 focus:ring-purple-500 focus:border-purple-500" value={phone} onChange={handlePhoneChange} />
                         </div>
                         <Button type="submit" size="lg" className="w-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all duration-300 ease-in-out hover:scale-105 shadow-[0_0_30px_rgba(156,39,176,0.8)] h-auto min-h-14 py-4 text-lg whitespace-normal disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100" disabled={!isFormValid || isLoading}>
                             {isLoading ? (
                                 <div className="flex items-center justify-center">
                                     <RotateCw className="w-6 h-6 animate-spin mr-2" />
                                     Enviando...
                                 </div>
                             ) : (
                                 "Quero aumentar meu faturamento"
                             )}
                         </Button>
                     </form>
                </GlassCard>
            </div>
        </section>

        {/* Objeções */}
        <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">AINDA EM DÚVIDA?</h2>
                    <p className="text-lg text-gray-300 mt-4">Vamos quebrar as objeções mais comuns que impedem negócios de crescerem.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-[#1C162C] p-8 rounded-2xl border border-purple-500/20 flex flex-col items-center text-center shadow-[0_0_20px_rgba(156,39,176,0.5)]">
                        <SearchX className="w-12 h-12 mb-6 text-purple-400"/>
                        <h3 className="text-2xl font-bold text-white mb-4">“E se não funcionar para mim?”</h3>
                        <p className="text-gray-300">Se o seu serviço resolve um problema real, funciona. A diferença é <span className="font-bold text-white">alcançar as pessoas certas.</span></p>
                    </div>
                    <div className="bg-[#1C162C] p-8 rounded-2xl border border-purple-500/20 flex flex-col items-center text-center shadow-[0_0_20px_rgba(156,39,176,0.5)]">
                        <CircleDollarSign className="w-12 h-12 mb-6 text-purple-400"/>
                        <h3 className="text-2xl font-bold text-white mb-4">“É caro anunciar?”</h3>
                        <p className="text-gray-300">Caro é investir sem saber para onde o dinheiro vai. Aqui <span className="font-bold text-white">tudo é medido para gerar lucro.</span></p>
                    </div>
                    <div className="bg-[#1C162C] p-8 rounded-2xl border border-purple-500/20 flex flex-col items-center text-center shadow-[0_0_20px_rgba(156,39,176,0.5)]">
                        <FileText className="w-12 h-12 mb-6 text-purple-400"/>
                        <h3 className="text-2xl font-bold text-white mb-4">“Preciso de estrutura pronta?”</h3>
                        <p className="text-gray-300">Não, você precisa de um <span className="font-bold text-white">produto/serviço validado</span> e <span className="font-bold text-white">disposição para crescer.</span></p>
                    </div>
                    <div className="bg-[#1C162C] p-8 rounded-2xl border border-purple-500/20 flex flex-col items-center text-center shadow-[0_0_20px_rgba(156,39,176,0.5)]">
                        <CalendarDays className="w-12 h-12 mb-6 text-purple-400"/>
                        <h3 className="text-2xl font-bold text-white mb-4">“Quando vejo resultados?”</h3>
                        <p className="text-gray-300">Resultados iniciais podem surgir em <span className="font-bold text-white">semanas</span>, mas o crescimento consistente é um <span className="font-bold text-white">processo de médio a longo prazo.</span></p>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">PERGUNTAS FREQUENTES</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="faq-1" asChild><GlassCard><AccordionTrigger className="text-lg font-medium hover:no-underline text-white p-6">O que é tráfego pago?</AccordionTrigger><AccordionContent className="text-gray-400 px-6 pb-6">É a criação de anúncios em plataformas como Google e Instagram para atrair visitantes qualificados ao seu site ou WhatsApp.</AccordionContent></GlassCard></AccordionItem>
              <AccordionItem value="faq-2" asChild><GlassCard><AccordionTrigger className="text-lg font-medium hover:no-underline text-white p-6">Que tipo de negócio precisa estar no digital?</AccordionTrigger><AccordionContent className="text-gray-400 px-6 pb-6">Todos. Quem não está no digital está perdendo clientes todos os dias.</AccordionContent></GlassCard></AccordionItem>
              <AccordionItem value="faq-3" asChild><GlassCard><AccordionTrigger className="text-lg font-medium hover:no-underline text-white p-6">Para quem NÃO é indicado?</AccordionTrigger><AccordionContent className="text-gray-400 px-6 pb-6">Para quem espera resultado imediato ou milagres. Crescimento sólido leva tempo.</AccordionContent></GlassCard></AccordionItem>
              <AccordionItem value="faq-4" asChild><GlassCard><AccordionTrigger className="text-lg font-medium hover:no-underline text-white p-6">Qual o investimento mínimo?</AccordionTrigger><AccordionContent className="text-gray-400 px-6 pb-6">O investimento em anúncios é flexível, mas recomendamos um valor inicial para garantir resultados expressivos.</AccordionContent></GlassCard></AccordionItem>
              <AccordionItem value="faq-5" asChild><GlassCard><AccordionTrigger className="text-lg font-medium hover:no-underline text-white p-6">Qual é o prazo mínimo de contrato?</AccordionTrigger><AccordionContent className="text-gray-400 px-6 pb-6">Trabalhamos com contratos que favorecem a construção de resultados a longo prazo.</AccordionContent></GlassCard></AccordionItem>
              <AccordionItem value="faq-6" asChild><GlassCard><AccordionTrigger className="text-lg font-medium hover:no-underline text-white p-6">Como é feito o pagamento?</AccordionTrigger><AccordionContent className="text-gray-400 px-6 pb-6">O pagamento é feito de forma segura e transparente, com opções flexíveis.</AccordionContent></GlassCard></AccordionItem>
              <AccordionItem value="faq-7" asChild><GlassCard><AccordionTrigger className="text-lg font-medium hover:no-underline text-white p-6">Vocês garantem resultados?</AccordionTrigger><AccordionContent className="text-gray-400 px-6 pb-6">Garantimos a aplicação das melhores estratégias. O resultado final depende de uma parceria sólida entre nós e o cliente.</AccordionContent></GlassCard></AccordionItem>
              <AccordionItem value="faq-8" asChild><GlassCard><AccordionTrigger className="text-lg font-medium hover:no-underline text-white p-6">Como contratar?</AccordionTrigger><AccordionContent className="text-gray-400 px-6 pb-6">Preencha o formulário em nossa página e agende uma conversa.</AccordionContent></GlassCard></AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Encerramento */}
        <section className="py-16 md:py-20 text-center">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <p className="text-2xl text-gray-300 mb-8">A internet não é opcional — é o que separa empresas que crescem das que desaparecem.</p>
                <p className="text-xl text-gray-300 mb-12">A Construa Seu Sucesso existe para colocar sua empresa no caminho certo com estratégia, posicionamento e tráfego pago profissional.</p>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Quando sua marca aparece para as pessoas certas todos os dias... o crescimento é inevitável.</p>
            </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10 bg-[#050510] text-center">
        <div className="container px-4 mx-auto">
          <p className="font-bold text-lg text-white mb-2">Construa Seu Sucesso</p>
          <p className="text-gray-400 mb-1">Estratégia Digital e Tráfego Pago</p>
          <p className="text-gray-500 text-sm mb-4">Atendimento em todo o Brasil 🇧🇷</p>
          <div className="flex justify-center items-center gap-2 text-gray-600 text-xs mb-4">
             <span>Av. Paulista, 1000 - São Paulo, SP</span>
          </div>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Construa Seu Sucesso. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
