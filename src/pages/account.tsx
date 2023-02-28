import Head from 'next/head';
import Image from 'next/image';

import { useAuth } from '@/contexts/auth';

export default function Account() {
  const { user, isAuthenticated, handleSignOut } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <Head>
          <title>Account</title>
        </Head>
        <section>
          <h1>Account</h1>
          <Image
            src={user?.photoURL!}
            width={50}
            height={50}
            alt={`${user?.displayName} Google photo`}
          />
          <p>
            Display Name: <strong>{user?.displayName}</strong>
          </p>
          <p>
            Email: <strong>{user?.email}</strong>
          </p>
          <p>
            UID: <strong>{user?.uid}</strong>
          </p>
          <button onClick={handleSignOut}>Sign out</button>
        </section>
      </>
    );
  }
}
