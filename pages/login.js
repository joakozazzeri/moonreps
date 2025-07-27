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
    </>
  );
} 