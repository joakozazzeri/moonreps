import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar el token en localStorage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', data.username);
        router.push('/admin');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white text-modern mb-3">
            Moon Reps
          </h2>
          <p className="text-gray-400 text-subtitle">
            Acceso Administrativo
          </p>
        </div>
        
        <div className="bg-brand-dark/60 backdrop-blur-sm border border-brand-light/30 rounded-modern p-8 card-modern">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-modern p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-modern text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-light/50 focus:border-transparent transition-all"
                placeholder="Ingresa tu usuario"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-modern text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-light/50 focus:border-transparent transition-all"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-modern text-sm font-medium text-white bg-brand-light hover:bg-brand-light/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors link-improved"
            >
              ← Volver a la tienda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 