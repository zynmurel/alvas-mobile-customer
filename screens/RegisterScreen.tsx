// screens/RegisterScreen.tsx
import axios from 'axios';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { baseUrl } from '../helpers/endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../helpers/zustand/user';

export default function RegisterScreen({ navigation }: any) {
  const { setUser } = useUserStore()
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    address: '',
    place_description: '',
    contact_number: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false)

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let valid = true;

    if(form["username"].length < 8 ){
      newErrors["username"] = 'Username must be longer than 8 characters'
    }
    if(form["password"].length < 8 ){
      newErrors["password"] = 'Password must be longer than 8 characters'
    }
    if (form["password"] !== form["confirmPassword"]) {
      newErrors["confirmPassword"] = 'Password does not match'
    }
    Object.keys(form).forEach((key) => {
      if (!form[key as keyof typeof form]) {
        newErrors[key] = `Required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        setLoading(true)
        const data: any = await axios.post(baseUrl + '/api/mobile/customer/register', {
          username: form.username,
          password: form.password,
          first_name: form.first_name,
          middle_name: form.middle_name,
          last_name: form.last_name,
          address: form.address,
          place_description: form.place_description,
          contact_number: form.contact_number,
        })
        if (data.data.error) {
          if (data.data.error === "username") {
            setErrors({ "username": "Username is already used." });
          } else if (data.data.error === "contact_number") {
            setErrors({ "contact_number": "Contact number is already used." });
          }
        }
        if (data.data.user) {
          await AsyncStorage.setItem('user', JSON.stringify(data.data.user)).then(() => {
            setUser(data.data.user)
          })
        }
      } catch (e) {
        console.log(e)
      }finally {
        setLoading(false)
    }
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`px-4 py-10`}>
      <View style={tw`absolute left-0 top-10 w-28`}>
        <Image
          style={{
            height: 40
          }}
          source={require('../assets/images/logo.png')}
          contentFit="contain"
          transition={1000}
        /></View>
      <Text style={tw`mt-10 text-2xl font-bold text-center text-green-700 `}>Register</Text>
      <View style={tw`flex items-center w-full p-2 mt-2 text-2xl font-bold text-center text-green-700 bg-green-700 border border-green-700 rounded-t`}>
        <Text style={tw`font-bold text-white uppercase`}>Personal Details</Text>
      </View>
      <View style={tw`p-2 border border-t-0 rounded-b border-slate-300`}>
        <Text style={tw`text-sm font-bold text-green-700 `}>First name</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 ${errors.first_name ? 'border-red-500' : ''}`}
          placeholder="Input first name"
          value={form.first_name}
          onChangeText={(value) => handleChange('first_name', value)}
          secureTextEntry={false}
        />
        {errors.first_name && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.first_name}</Text>}


        <Text style={tw`text-sm font-bold text-green-700 `}>Middle name</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 ${errors.middle_name ? 'border-red-500' : ''}`}
          placeholder="Input middle name"
          value={form.middle_name}
          onChangeText={(value) => handleChange('middle_name', value)}
          secureTextEntry={false}
        />
        {errors.middle_name && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.middle_name}</Text>}


        <Text style={tw`text-sm font-bold text-green-700 `}>Last name</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 ${errors.last_name ? 'border-red-500' : ''}`}
          placeholder="Input last name"
          value={form.last_name}
          onChangeText={(value) => handleChange('last_name', value)}
          secureTextEntry={false}
        />
        {errors.last_name && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.last_name}</Text>}


        <Text style={tw`text-sm font-bold text-green-700 `}>Contact Number</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 ${errors.contact_number ? 'border-red-500' : ''}`}
          placeholder="Input first name"
          value={form.contact_number}
          onChangeText={(value) => handleChange('contact_number', value)}
          secureTextEntry={false}
        />
        {errors.contact_number && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.contact_number}</Text>}

        <Text style={tw`text-sm font-bold text-green-700 `}>Address</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 ${errors.address ? 'border-red-500' : ''}`}
          placeholder="Input address"
          value={form.address}
          onChangeText={(value) => handleChange('address', value)}
          secureTextEntry={false}
        />
        {errors.address && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.address}</Text>}


        <Text style={tw`text-sm font-bold text-green-700 `}>Place description of your address</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 h-20 ${errors.place_description ? 'border-red-500' : ''}`}
          placeholder="Input your place description"
          value={form.place_description}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChange('place_description', value)}
          secureTextEntry={false}
        />
        {errors.place_description && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.place_description}</Text>}
      </View>


      <View style={tw`flex items-center w-full p-2 mt-2 text-2xl font-bold text-center text-green-700 bg-green-700 border border-green-700 rounded-t`}>
        <Text style={tw`font-bold text-white uppercase`}>Credentials</Text>
      </View>
      <View style={tw`p-2 border border-t-0 rounded-b border-slate-300`}>
        <Text style={tw`text-sm font-bold text-green-700 `}>Username</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 ${errors.username ? 'border-red-500' : ''}`}
          placeholder="Input username"
          value={form.username}
          onChangeText={(value) => handleChange('username', value)}
          secureTextEntry={false}
        />
        {errors.username && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.username}</Text>}


        <Text style={tw`text-sm font-bold text-green-700 `}>Password</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 ${errors.password ? 'border-red-500' : ''}`}
          placeholder="Input password"
          value={form.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry={true}
        />
        {errors.password && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.password}</Text>}

        <Text style={tw`text-sm font-bold text-green-700 `}>Confirm Password</Text>
        <TextInput
          style={tw`border rounded-lg p-3 mb-2 ${errors.confirmPassword ? 'border-red-500' : ''}`}
          placeholder="Input confirmPassword"
          value={form.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
          secureTextEntry={true}
        />
        {errors.confirmPassword && <Text style={tw`mb-1 -mt-2 text-xs text-red-500`}>{errors.confirmPassword}</Text>}

      </View>


      <View style={tw`p-1 mt-5 bg-green-700 rounded-lg`}><Button disabled={loading} title={loading ? "Loading..." : "Register"} color={"white"} onPress={handleRegister} /></View>
      <TouchableOpacity style={tw`flex items-center justify-center p-3 text-base `} onPress={() => navigation.navigate('Login')}>
        <Text style={tw`text-green-700 `}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
