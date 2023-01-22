import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo.svg';

export function Header() {
  const { navigate } = useNavigation();

  async function signOut() {
    try {
      await auth().signOut();
      navigate('login');
    } catch (err) {
      Alert.alert(
        'Ops',
        'Não foi possível sair, verifique sua conexão e tente novamente.'
      );
    }
  }

  return (
    <View className='w-full flex-row items-center justify-between'>
      <Logo />

      <TouchableOpacity
        activeOpacity={0.7}
        className='flex-row h-11 px-4 border border-violet-500 rounded-lg items-center'
        onPress={() => navigate('new')}
      >
        <Feather name='plus' color={colors.violet[500]} size={20} />
        <Text className='text-white ml-3 font-semibold text-base'>Novo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signOut}>
        <Feather name='log-out' color={colors.violet[500]} size={20} />
      </TouchableOpacity>
    </View>
  );
}
