import Head from 'next/head';

import { useAuth } from '@/contexts/auth';

export default function SignIn() {
  const { isAuthenticated, handleSignIn } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        <section>
          <h1>Home</h1>
          <button onClick={handleSignIn}>Sign in with Google</button>
        </section>
      </>
    );
  }
}
