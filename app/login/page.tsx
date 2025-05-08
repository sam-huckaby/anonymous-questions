import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  // Get site password from environment variable
  const sitePassword = process.env.SITE_PASS;

  if (!sitePassword) {
    throw new Error('Missing environment variable: SITE_PASS must be set');
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-[80vh]">
        <LoginForm />
      </div>
    </>
  );
}
