import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const availiableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) return;

    await api.post('habits', {
      title,
      weekDays,
    });

    alert('Hábito criado');

    setTitle('');
    setWeekDays([]);
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const filteredWeekDays = weekDays.filter((day) => day !== weekDay);
      setWeekDays(filteredWeekDays);
    } else {
      const weekDaysAddOne = [...weekDays, weekDay];
      setWeekDays(weekDaysAddOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className='w-full flex flex-col mt-6'>
      <label htmlFor='title' className='font-semibold leading-tight'>
        Qual seu compromentimento?
      </label>

      <input
        type='text'
        id='title'
        placeholder='ex.: Exercícios, dormir bem, etc...'
        autoFocus
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-zinc-900'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor='' className='font-semibold leading-tight mt-4'>
        Qual a recorrência
      </label>

      <div className='flex flex-col gap-2 mt-3'>
        {availiableWeekDays.map((day, index) => (
          <Checkbox.Root
            className='flex items-center gap-3 group focus:outline-none'
            key={day}
            onCheckedChange={() => handleToggleWeekDay(index)}
            checked={weekDays.includes(index)}
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-800 focus:ring-offset-2 focus:ring-offset-background'>
              <Checkbox.Indicator>
                <Check size={20} color='white' />
              </Checkbox.Indicator>
            </div>

            <span className='text-white leading-tight'>{day}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type='submit'
        className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 fonmt-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900'
      >
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  );
}
