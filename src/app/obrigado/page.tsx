
import React from 'react';

const ObrigadoPage = () => {
  return (
    <div className="min-h-screen bg-[#0A091A] text-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 mb-4">
        Cadastro Recebido!
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
        Obrigado por se cadastrar. Em breve, nossa equipe entrará em contato com você pelo WhatsApp para dar os próximos passos.
      </p>
      <p className="text-lg md:text-xl text-gray-300 mt-2 max-w-2xl">
        Fique atento!
      </p>
    </div>
  );
};

export default ObrigadoPage;
