import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup, signOut } from 'firebase/auth';

import { auth, provider } from '@/services/firebase';

interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleSignIn(): Promise<void>;
  handleSignOut(): Promise<void>;
}

interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const value = { user, isAuthenticated, isLoading, handleSignIn, handleSignOut };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const data = {
          displayName: user.displayName!,
          email: user.email!,
          photoURL: user.photoURL!,
          uid: user.uid!
        };

        setUser(data);

        if (router.pathname !== '/account') router.push('/account');
      } else {
        setUser(null);

        if (router.pathname === '/account') router.push('/');
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleSignIn() {
    try {
      await signInWithPopup(auth, provider);

      router.push('/account');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
