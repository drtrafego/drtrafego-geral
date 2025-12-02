import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdvogadosPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-slate-950 text-white">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
          Casal do Tráfego para Advogados
        </h1>
        <p className="text-xl text-gray-400">
          Marketing jurídico ético e eficiente.
          Conquiste clientes qualificados respeitando o código de ética da OAB.
        </p>
        
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-sm">
          <p className="text-lg mb-6">Estamos preparando um conteúdo exclusivo para você.</p>
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-full">
            <Link href="/">Voltar para a Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
