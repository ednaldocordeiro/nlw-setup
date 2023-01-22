import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';
import app from '@react-native-firebase/app'

import { useForm, Controller } from 'react-hook-form';
import * as zod from 'zod';
import auth from '@react-native-firebase/auth'

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const loginValidationSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
})

type SignUp = zod.infer<typeof loginValidationSchema>

export function SignUp() {
  const navigation = useNavigation()
  const {control, handleSubmit, formState: {errors}} = useForm<SignUp>()

  async function handleLogin(data: SignUp) {
    try {
      const user = await auth().createUserWithEmailAndPassword(data.email, data.password)

      if (user) {
        navigation.navigate('home')
      }
    } catch (error) {
      Alert.alert('Login', 'Não foi possível criar usuário. Verifique seu e-mail e sua senha e tente novamente.')
    }
  } 

  return (
    <View className='flex-1 bg-background px-8 py-16 justify-between'>
      <ScrollView>
        <View>
          <Text className='mt-6 text-white font-extrabold text-3xl'>
            Faça login para acompanhar seus hábitos em{' '}
            <Text className='text-violet-500'>equipe</Text>.
          </Text>

          <Text className='mt-6 text-white font-extrabold text-xl'>
            Já tem uma conta?
          </Text>
          <TouchableOpacity
              onPress={() => navigation.navigate('login')}
              activeOpacity={.7}
            >
            <Text className='text-violet-500 font-extrabold text-xl'>Faça login</Text>
          </TouchableOpacity>
        </View>

        <View className='mt-11 flex-1'>
          <Text className='mt-6 text-white font-extrabold'>Email</Text>

          <Controller
            name='email'
            control={control}
            rules={{
              required: true
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder='ex.: seunome@gmail.com'
                className='h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600'
                placeholderTextColor={colors.zinc[400]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          {errors.email && <Text className='text-white'>Preencha com um e-mail válido</Text>}

          <Text className='mt-6 text-white font-extrabold'>Senha</Text>
          
          <Controller
            name='password'
            control={control}
            rules={{
              required: true
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder='ex.: abcd1234'
                className='h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600'
                placeholderTextColor={colors.zinc[400]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={true}
              />
            )}
          />

          {errors.email && <Text className='text-white'>Preencha com uma senha válida</Text>}
        </View>

        <TouchableOpacity 
          onPress={handleSubmit(handleLogin)}
          className='w-full h-12 mt-20 flex-row justify-center items-center bg-violet-500 rounded-md'
        >
          <Feather name='log-in' color={colors.white} />
          <Text className='font-semibold text-base text-white ml-2'>Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
