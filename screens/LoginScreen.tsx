// screens/LoginScreen.tsx
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import tw from 'twrnc';
import { RootStackParamList } from '../@types/router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'expo-image'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../helpers/endpoint';
import { useUserStore } from '../helpers/zustand/user';



type LoginScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'Login'>;
};
export default function LoginScreen({ navigation }: LoginScreenProps) {
    const { setUser } = useUserStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const validateForm = () => {
        let valid = true;
        const newErrors: { username?: string; password?: string } = {};

        if (!username) {
            newErrors.username = 'Username is required';
            valid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async () => {
        if (validateForm()) {
            setLoading(true)
            try {
                const data: any = await axios.post(baseUrl + '/api/mobile/customer/login', {
                    username,
                    password,
                })
                if (data.data.status === 401) {
                    if (data.data.message === "user_not_found") {
                        setErrors({ username: "User not found" })
                    } else {
                        setErrors({ password: "Wrong password" })
                    }
                } else {
                    await AsyncStorage.setItem('user', JSON.stringify(data.data.user)).then(()=>{
                        setUser(data.data.user)
                    })
                }
            } catch (e: any) {
                setErrors({ password: "Error logging in" })
                setErrors({ password: "" })
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <View style={tw`flex-1 justify-center px-4 overflow-scroll relative`}>
            <View style={tw` absolute top-10 left-0 w-28`}>
                <Image
                    style={{
                        height: 40
                    }}
                    source={require('../images/logo.png')}
                    contentFit="contain"
                    transition={1000}
                /></View>
            <Text style={tw`text-4xl font-black text-center text-green-700`}>LOGIN</Text>
            <Text style={tw` text-center mb-6 text-base px-2 text-green-600`}>Log in to the Alvas app for effortless online ordering and delivery.</Text>

            <Text style={tw` text-base text-green-700 font-bold`}>Username</Text>
            <TextInput
                style={tw`border rounded-lg p-4 mb-1 ${errors.username ? 'border-red-500' : ''}`}
                placeholder="Input password"
                value={username}
                onChangeText={setUsername}
                secureTextEntry={false}
            />
            {errors.username && <Text style={tw`text-red-500 mb-1`}>{errors.username}</Text>}

            <Text style={tw` text-base text-green-700 font-bold mt-2`}>Password</Text>
            <View style={tw`relative`}>
                <TextInput
                    style={tw`border rounded-lg p-4 mb-1 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Input password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={false}
                />
                {/* <TouchableOpacity  style={tw`absolute right-4 bottom-5 bg-red-100 z-2`} onPress={()=>navigation.navigate('Register')}>
            <Feather name="eye" size={22} color="gray" />
            </TouchableOpacity> */}
            </View>
            {errors.password && <Text style={tw`text-red-500 mb-1`}>{errors.password}</Text>}

            <View style={tw` bg-emerald-600 rounded-lg mt-5 p-1`}><Button disabled={loading} title={loading ? "Loading..." : "Login"} color={"white"} onPress={handleLogin} /></View>

            <TouchableOpacity style={tw` flex items-center justify-center text-base p-3`} onPress={() => navigation.navigate('Register')}>
                <Text style={tw` text-emerald-600`}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
