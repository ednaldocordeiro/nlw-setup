import './styles/global.css';
import { auth } from './lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './lib/dayjs'
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Routes';
import { AuthProvider } from './contexts/AuthContext';

export function App() {
  async function singIn() {
    try {
      const user = await signInWithEmailAndPassword(auth, 'ednaldocordeiro2017@gmail.com', 'ed1x23byte')
      // console.log(user.user);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    singIn()
  }, [])

  return (
    <BrowserRouter>
      <div id='firebase-auth-container'>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}
