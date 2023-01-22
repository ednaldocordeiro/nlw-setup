import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { Habit } from '../screens/Habit'
import { New } from '../screens/New'
import { Login } from '../screens/Login'
import { SignUp } from '../screens/SignUp'

const {Navigator, Screen} = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='login' component={Login}/>
      <Screen name='signup' component={SignUp}/>
      <Screen name='home' component={Home}/>
      <Screen name='new' component={New}/>
      <Screen name='habit' component={Habit}/>
    </Navigator>
  )
}