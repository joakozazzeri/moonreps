// components/WelcomePopup.js
import { useState, useEffect } from 'react';
import Image from 'next/image';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró el popup en esta sesión
    const popupShown = sessionStorage.getItem('welcomePopupShown');
    
    if (!popupShown) {
      // Mostrar el popup después de 1 segundo
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Pequeño delay para que la animación se vea mejor
        setTimeout(() => setIsVisible(true), 100);
        setHasShown(true);
        sessionStorage.setItem('welcomePopupShown', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Esperar a que termine la animación antes de ocultar completamente
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleKakobuyClick = () => {
    window.open('https://ikako.vip/r/moonreps', '_blank');
  };

  const handleDiscordClick = () => {
    window.open('https://discord.gg/3UW8ZAAWrG', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-gray-900 border border-gray-700 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 relative overflow-hidden transition-all duration-300 ease-out transform ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
      }`}>
        {/* Fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"></div>
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenido del popup */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className={`mb-6 transition-all duration-500 ease-out delay-100 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Image 
              src="/logo.png" 
              alt="Moon Reps Logo" 
              width={120} 
              height={48} 
              className="mx-auto object-contain"
            />
          </div>

          {/* Título */}
          <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-4 transition-all duration-500 ease-out delay-200 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            ¡Bienvenido a <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Moon Reps</span>!
          </h2>

          {/* Descripción */}
          <p className={`text-gray-300 text-sm sm:text-base mb-8 leading-relaxed transition-all duration-500 ease-out delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Únete a nuestra comunidad de Discord para obtener cupones de envío exclusivos
          </p>

          {/* Botones */}
          <div className={`space-y-4 transition-all duration-500 ease-out delay-400 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Botón Kakobuy */}
            <button
              onClick={handleKakobuyClick}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-xl text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <Image 
                src="/kakobuy-logo.png" 
                alt="Kakobuy Logo" 
                width={24} 
                height={24} 
                className="w-6 h-6 object-contain"
              />
              <span className="font-semibold text-sm sm:text-base">
                ¡Regístrate en Kakobuy y recibe +$410 en cupones!
              </span>
            </button>

            {/* Botón Discord */}
            <button
              onClick={handleDiscordClick}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 border border-blue-500/30 rounded-xl text-white hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="font-semibold text-sm sm:text-base">
                Únete al Discord
              </span>
            </button>
          </div>

          {/* Texto adicional */}
          <p className={`text-gray-500 text-xs mt-6 transition-all duration-500 ease-out delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Puedes cerrar esta ventana y continuar explorando los productos
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup; 