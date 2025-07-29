import Head from 'next/head';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <>
      <Head>
        <title>Moon Reps - Login Administrativo</title>
        <meta name="description" content="Acceso administrativo para Moon Reps" />
      </Head>
      <LoginForm />
      
      {/* Footer */}
      <footer className="text-center py-6 mt-12">
        <p className="text-gray-400 text-sm">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">© 2025 </span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Moon Reps</span>
          <span className="text-gray-400"> • Todos los derechos reservados</span>
        </p>
      </footer>
    </>
  );
} 