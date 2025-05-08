import Header from '@/components/Header';
import ClientPage from '@/components/ClientPage';
import { initializeDatabaseAction } from '@/lib/actions';

export default async function Home() {
  // Initialize database on app startup
  await initializeDatabaseAction();

  // Get site password from environment variable
  const sitePassword = process.env.SITE_PASS;
  const siteQuestion = process.env.SITE_QUESTION;

  if (!sitePassword || !siteQuestion) {
    throw new Error('Missing environment variables: SITE_PASS and SITE_QUESTION must be set');
  }

  return (
    <>
      <Header />
      <ClientPage
        sitePassword={sitePassword}
        siteQuestion={siteQuestion}
      />
    </>
  );
}
