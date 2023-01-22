import { createContext } from 'use-context-selector';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { ReactNode, useCallback, useState } from 'react';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

interface UserData {
  email: string;
  password: string;
}

interface AuthContext {
  user: UserCredential | undefined;
  signIn: ({ email, password }: UserData) => void;
  createUser: ({ email, password }: UserData) => void;
}

export const Auth = createContext({} as AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserCredential>();
  const navigate = useNavigate();

  const signIn = useCallback(async ({ email, password }: UserData) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        setUser(user);
        navigate('/');
      }
    } catch (error) {
      alert(
        'Não foi possivel logar! Verifique seu e-mail e sua senha para prosseguir.'
      );
    }
  }, []);

  const createUser = useCallback(async ({ email, password }: UserData) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (newUser) {
        setUser(newUser);
        signIn({ email, password });
        navigate('/');
      }
    } catch (err) {
      alert('Não foi possível criar usuário!');
    }
  }, []);

  return <Auth.Provider value={{ user, signIn, createUser }}>{children}</Auth.Provider>;
}
