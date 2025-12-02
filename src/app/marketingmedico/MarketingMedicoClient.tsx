"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  CheckCircle, 
  CheckCircle2,
  XCircle, 
  ChevronRight, 
  Quote, 
  Search, 
  MapPin, 
  UserCheck, 
  Users, 
  CalendarX, 
  UserX, 
  AlertCircle, 
  EyeOff, 
  Clock, 
  ShieldAlert,
  TrendingUp,
  Megaphone,
  BarChart3,
  Bot,
  ArrowRight,
  RotateCw
} from "lucide-react";

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
    <div className="font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      
      {/* 1. HERO SECTION */}
      <section className="w-full pt-24 pb-20 md:pt-32 md:pb-24 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
            Atraia mais pacientes, fortaleça sua presença digital e tenha sua <span className="text-primary">agenda sempre cheia.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed">
            Unimos Google, Meta e BOT humanizado para atrair pacientes qualificados, fortalecer seu nome e organizar seu fluxo de agendamentos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-primary/20 transition-all">
              <Link href="#sessao-estrategica">Quero mais pacientes qualificados</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1 (Awareness) */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Sua Clínica Precisa Ser Encontrada Todos os Dias
          </h2>
          <div className="text-lg text-muted-foreground space-y-6 leading-relaxed text-left md:text-center">
            <p>
              Hoje, os pacientes pesquisam antes de agendar: sintomas, especialidades clínicas, localização e reputação.
            </p>
            <p className="font-semibold text-foreground">
              A questão é simples:
            </p>
            <ul className="space-y-3 inline-block text-left">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Quando alguém procura sua especialidade no Google… aparece você ou outra clínica?</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Sua comunicação nas redes transmite segurança, confiança e profissionalismo?</span>
              </li>
            </ul>
            <p>
              Nós criamos a presença digital que sua clínica precisa para atrair pacientes que já estão procurando seus serviços.
            </p>
          </div>
          <div className="mt-10">
            <Link href="#sessao-estrategica" className="text-primary font-bold text-lg hover:underline inline-flex items-center gap-2">
              Solicitar Sessão Estratégica Gratuita <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SECTION 2 (About - Casal do Tráfego) */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Quem Somos: Casal do Tráfego
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nós somos o Casal do Tráfego, uma agência de marketing médico especialistas para médicos, clínicas e consultórios desde 2019.
              </p>
              <div className="space-y-4">
                {[
                  "Trabalhamos com Google Ads + Meta Ads",
                  "Construímos posicionamento médico",
                  "Ajudamos clínicas a terem agenda cheia",
                  "Aplicamos automações e BOT humanizado",
                  "Criamos campanhas éticas, profissionais e sustentáveis"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xl font-bold text-foreground pt-4 border-t border-border">
                Nosso foco é simples: atrair, qualificar e converter pacientes todos os dias.
              </p>
              <div className="pt-4">
                <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-lg">
                  <Link href="#sessao-estrategica">Quero melhorar minha presença digital</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-border shadow-lg">
               {/* 
                  ATENÇÃO: Para a imagem aparecer:
                  1. Salve sua foto como "foto-sobre.jpg" (ou .png)
                  2. Coloque ela dentro da pasta "public" do projeto
               */}
               <Image 
                 src="/imagem_institucional.jpeg"
                 alt="Foto Institucional Casal do Tráfego"
                 fill
                 className="object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTIONS 3 & 4 (Agitation - Problem/Solution) */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-20">
          
          {/* Section 3: How Patients Search */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                O Paciente Pesquisa Antes de Agendar
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                E quem não está presente estrategicamente… fica invisível. Por isso, clínicas com presença digital forte crescem mais rápido.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col items-center text-center">
                  <MapPin className="w-10 h-10 text-primary mb-3" />
                  <span className="font-semibold text-foreground">Fachada da clínica</span>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col items-center text-center">
                  <Search className="w-10 h-10 text-primary mb-3" />
                  <span className="font-semibold text-foreground">Maior buscador</span>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col items-center text-center">
                  <UserCheck className="w-10 h-10 text-primary mb-3" />
                  <span className="font-semibold text-foreground">Presença profissional</span>
                </div>
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col items-center text-center">
                  <Users className="w-10 h-10 text-primary mb-3" />
                  <span className="font-semibold text-foreground">Pacientes interessados</span>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
               <h3 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-4">
                O Que Impede Sua Clínica de Crescer
              </h3>
              <div className="grid gap-4">
                {[
                  "Agenda instável", "Pacientes pouco qualificados", 
                  "Dependência de indicações", "Falta de presença no Google", 
                  "Recepção sobrecarregada", "Falta de posicionamento", 
                  "Concorrência crescente", "Comunicação inconsistente"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-primary/10 p-4 rounded-lg border border-primary/20 text-center">
                <p className="text-primary font-semibold">
                  Nós resolvemos todos esses pontos com estratégia.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SECTION 5 (THE CORE FEATURE CARDS) */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nossa Metodologia Exclusiva
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Tudo o que sua clínica precisa para escalar em um só lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-16 h-16 text-primary group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-lg font-bold text-foreground">Estratégia Digital</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  Diagnóstico completo, Posicionamento médico, Análise do paciente ideal e planejamento de crescimento.
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Saiba mais <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-muted flex items-center justify-center">
                <Megaphone className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-lg font-bold text-foreground">Tráfego Pago (Google + Meta)</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  Unimos o poder das duas principais plataformas para gerar leads quentes e autoridade imediata.
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Saiba mais <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-16 h-16 text-primary group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-lg font-bold text-foreground">Branding e Autoridade</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  Clareza de comunicação, Posicionamento estratégico e narrativa profissional para sua marca.
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Saiba mais <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-muted flex items-center justify-center">
                <Bot className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-lg font-bold text-foreground">BOT Humanizado</h3>
                <p className="text-sm text-muted-foreground mt-2 flex-grow">
                  Atendimento 24h, qualificação automática de leads e aumento direto de agendamentos.
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Saiba mais <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SECTION 6 (Target Audience) */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-10">
            Para Quem É Essa Estratégia?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              "Clínicas Médicas", "Consultórios Particulares", "Médicos Especialistas",
              "Quem busca agenda cheia", "Quem quer pacientes particulares", "Quem quer crescer no digital"
            ].map((item, i) => (
              <div key={i} className="bg-card p-4 rounded-lg shadow-sm border border-border flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION 7 (Testimonials) */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Dra. Mariana Ribeiro", text: "Eu já tinha Instagram, mas não convertia. Agora atendo apenas o perfil de paciente certo que eu sempre quis." },
              { name: "Dr. Felipe Moura", text: "Sempre tive dificuldade com agências que não entendiam a ética médica. Com o Casal do Tráfego, agora recebo leads qualificados e durmo tranquilo." },
              { name: "Dra. Ana Paula Camargo", text: "Finalmente entendi a importância do posicionamento. Minha autoridade na cidade aumentou muito em 3 meses." },
              { name: "Dr. Ricardo Sanches", text: "O BOT de atendimento reduziu as ligações perdidas e organizou minha secretária. Fantástico." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-border shadow-sm relative hover:shadow-md transition-shadow">
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />
                <div className="relative z-10 pt-6">
                  <p className="text-muted-foreground italic mb-6 text-lg">"{testimonial.text}"</p>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA & FORM */}
      <section id="sessao-estrategica" className="py-24 bg-primary">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-primary-foreground space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Pronto para atrair muitos pacientes nos próximos 180 dias?
              </h2>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Agende sua Sessão Estratégica Gratuita com o Casal do Tráfego.
                Vamos analisar seu momento atual e desenhar o plano ideal.
              </p>
              <div className="pt-8 border-t border-primary-foreground/30">
                <p className="text-sm text-primary-foreground/80">
                  "A internet hoje é o que separa clínicas que crescem de clínicas que permanecem invisíveis..."
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Solicite seu Diagnóstico
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Nome Completo</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-background"
                    placeholder="Dr(a). Seu Nome"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">E-mail Profissional</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="h-12 bg-background"
                    placeholder="contato@suaclinica.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">WhatsApp</label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="h-12 bg-background"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 text-lg rounded-lg transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed h-auto min-h-[56px]"
                  disabled={!isFormValid || isLoading}
                >
                   {isLoading ? (
                     <div className="flex items-center justify-center">
                       <RotateCw className="w-6 h-6 animate-spin mr-2" />
                       Enviando...
                     </div>
                   ) : 'Quero agendar minha sessão'}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Seus dados estão seguros. Entraremos em contato em até 24h úteis.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
