import { UserPlus } from 'phosphor-react';
import { useState } from 'react';
import ReactLoading from 'react-loading';

import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useContextSelector } from 'use-context-selector';
import { Auth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const loginValidationSchema = zod.object({
  email: zod.string().email('Insira um e-mail válido'),
  password: zod.string().min(8),
});

type Login = zod.infer<typeof loginValidationSchema>;

export function Signup() {
  const [loading, setLoading] = useState(false);
  const createUser = useContextSelector(Auth, (context) => {
    return context.createUser;
  });

  const { register, reset, handleSubmit } = useForm<Login>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSubmitForm(data: Login) {
    setLoading(true);
    setTimeout(() => createUser(data), 3000);
    setTimeout(() => setLoading(false), 5000);
  }

  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <ReactLoading type='cubes' color='#8B5CF6' />
      </div>
    );
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-full max-w-5xl px-6 flex gap-16'>
        <div className='w-1/2'>
          <h1 className='text-5xl font-bold w-1/1'>
            Crie uma conta para criar novos{' '}
            <span className='text-violet-500'>hábitos</span> em equipe.
          </h1>

          <p className='mt-4'>
            Já tem uma conta?{' '}
            <Link
              to={'/login'}
              className='font-semibold text-violet-700 underline'
            >
              Faça login
            </Link>
            !
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className='w-96 max-w-sm flex flex-col my-0 mx-auto gap-3'
        >
          <label htmlFor='email' className='font-semibold leading-tight'>
            Insira seu e-mail
          </label>

          <input
            id='email'
            type='text'
            placeholder='ex.: seunome@email.com'
            className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-zinc-900'
            {...register('email')}
          />

          <label
            htmlFor='password'
            className='font-semibold leading-tight mt-4'
          >
            Crie uma senha
          </label>

          <input
            id='password'
            type='password'
            placeholder='ex.: abcd1234'
            className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-zinc-900'
            {...register('password')}
          />

          <button
            type='submit'
            className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 fonmt-semibold bg-violet-600 hover:bg-violet-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900'
          >
            <UserPlus /> Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}
