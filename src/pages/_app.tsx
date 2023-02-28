import { AppProps } from 'next/app';

import { AuthProvider } from '@/contexts/auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
