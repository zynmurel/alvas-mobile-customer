// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CustomerScreen from './screens/CustomerScreen';
import { getUser } from './helpers/utils/storage';
import { User } from './@types/user';
import { useUserStore } from './helpers/zustand/user';

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const {user , setUser} = useUserStore();

  useEffect(() => {
    const user = async () => {
      const user = await getUser()
      if(user?.user_id){
        setUser(user)
      }else{
        setUser(undefined)
      }
    }
    user()
  }, []);

  useEffect(()=>{
    if(!!user){
console.log(user)
    }
  },[user])

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerShown:false }}>{user ? (
        // If user is logged in, show CustomerScreen
        <Stack.Screen name="Customer" component={CustomerScreen} />
      ) : (
        // If user is not logged in, show Login and Register screens
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
