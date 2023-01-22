import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { HabitDay, DAY_SIZE } from '../components/HabitDay';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../lib/axios';

import auth from '@react-native-firebase/auth'

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const dateFromYearStart = generateRangeDatesFromYearStart();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - dateFromYearStart.length;

interface Sumamry {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export function Home() {
  const { navigate } = useNavigation();
  const [summary, setSummary] = useState<Sumamry[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSummary() {
    try {
      setLoading(true);
      const response = await api.get('/summary');
      setSummary(response.data);
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchSummary();
  }, []));

  if (loading) return <Loading />

  return (
    <View className='bg-background flex-1 px-8 pt-16'>
      <Header />

      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((day, index) => (
          <Text
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            key={day + index}
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className=' flex flex-row flex-wrap'>
          {dateFromYearStart.map((date, index) => {
            const dayWithHabits = summary.find((day) => dayjs(date).isSame(day.date));

            return (
              <HabitDay
                key={date.toISOString()}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                date={date}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            )
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                key={index}
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
