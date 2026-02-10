import { useState, useEffect } from 'react';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcomePopup', 'true');
  };

  const handleDiscord = () => {
    window.open('https://discord.gg/3UW8ZAAWrG', '_blank');
  };

  const handleRegister = () => {
    window.open('https://ikako.vip/r/moonreps', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="bg-surface-900 border border-surface-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl animate-slideIn mx-4">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-display">
              Bienvenido a <span className="text-primary-500">Moon Reps</span>
            </h2>
            <p className="text-zinc-400 text-sm">
              Tu puerta de entrada a las mejores réplicas de calidad.
            </p>
          </div>

          <div className="bg-surface-800/50 rounded-xl p-4 text-left space-y-3 border border-surface-700/50">
            <p className="text-zinc-300 text-sm leading-relaxed">
              <span className="text-amber-500 font-semibold">⚠️ Importante:</span> Moon Reps es una plataforma de búsqueda y recomendación. No vendemos productos directamente.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Utilizamos <span className="text-white font-medium">Kakobuy</span> como agente de compras recomendado para garantizar seguridad en tus transacciones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleRegister}
              className="btn btn-primary w-full py-3 text-sm font-semibold"
            >
              Registrarse en Kakobuy
            </button>
            <button
              onClick={handleDiscord}
              className="btn bg-[#5865F2] hover:bg-[#4752C4] text-white w-full py-3 text-sm font-semibold"
            >
              Unirse al Discord
            </button>
          </div>

          <button
            onClick={handleClose}
            className="text-zinc-500 text-xs hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4"
          >
            Entendido, continuar al sitio
          </button>
        </div>
      </div>
    </div>
  );
}