import { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular pequeño retardo para feedback visual
    setTimeout(() => {
      // En una app real, esto validaría contra un backend
      if (password === 'moonreps2024') {
        onLogin(true);
      } else {
        setError('Contraseña incorrecta');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="w-full max-w-md bg-surface-900 border border-surface-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Acceso Restringido</h2>
          <p className="text-zinc-400 text-sm">
            Ingresa la contraseña para acceder al contenido exclusivo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full p-3"
              placeholder="••••••••"
              autoFocus
            />
            {error && (
              <p className="text-rose-500 text-sm ml-1 animate-fadeIn">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className="btn btn-primary w-full py-3 font-semibold relative overflow-hidden"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando...
              </span>
            ) : 'Ingresar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            ¿No tienes acceso? <a href="https://discord.gg/3UW8ZAAWrG" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 underline">Únete al Discord</a>
          </p>
        </div>
      </div>
    </div>
  );
}