// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import tw from 'twrnc';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    address: '',
    place_description: '',
    contact_number: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let valid = true;

    Object.keys(form).forEach((key) => {
      if (!form[key as keyof typeof form]) {
        newErrors[key] = `${key.replace('_', ' ')} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Handle registration logic here
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>Register</Text>

      <TextInput
        style={tw`border rounded-lg p-4 mb-1 ${errors.username ? 'border-red-500' : ''}`}
        placeholder="Username"
        value={form.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      {errors.username && <Text style={tw`text-red-500 mb-4`}>{errors.username}</Text>}

      <TextInput
        style={tw`border rounded-lg p-4 mb-1 ${errors.password ? 'border-red-500' : ''}`}
        placeholder="Password"
        value={form.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      {errors.password && <Text style={tw`text-red-500 mb-4`}>{errors.password}</Text>}

      <TextInput
        style={tw`border rounded-lg p-4 mb-1 ${errors.first_name ? 'border-red-500' : ''}`}
        placeholder="First Name"
        value={form.first_name}
        onChangeText={(value) => handleChange('first_name', value)}
      />
      {errors.first_name && <Text style={tw`text-red-500 mb-4`}>{errors.first_name}</Text>}

      <TextInput
        style={tw`border rounded-lg p-4 mb-1 ${errors.middle_name ? 'border-red-500' : ''}`}
        placeholder="Middle Name"
        value={form.middle_name}
        onChangeText={(value) => handleChange('middle_name', value)}
      />
      {errors.middle_name && <Text style={tw`text-red-500 mb-4`}>{errors.middle_name}</Text>}

      <TextInput
        style={tw`border rounded-lg p-4 mb-1 ${errors.last_name ? 'border-red-500' : ''}`}
        placeholder="Last Name"
        value={form.last_name}
        onChangeText={(value) => handleChange('last_name', value)}
      />
      {errors.last_name && <Text style={tw`text-red-500 mb-4`}>{errors.last_name}</Text>}

      <TextInput
        style={tw`border rounded-lg p-4 mb-1 ${errors.address ? 'border-red-500' : ''}`}
        placeholder="Address"
        value={form.address}
        onChangeText={(value) => handleChange('address', value)}
      />
      {errors.address && <Text style={tw`text-red-500 mb-4`}>{errors.address}</Text>}

      <TextInput
        style={tw`border rounded-lg p-4 mb-1 ${errors.place_description ? 'border-red-500' : ''}`}
        placeholder="Place Description"
        value={form.place_description}
        onChangeText={(value) => handleChange('place_description', value)}
      />
      {errors.place_description && <Text style={tw`text-red-500 mb-4`}>{errors.place_description}</Text>}

      <TextInput
        style={tw`border rounded-lg p-4 mb-1 ${errors.contact_number ? 'border-red-500' : ''}`}
        placeholder="Contact Number"
        value={form.contact_number}
        onChangeText={(value) => handleChange('contact_number', value)}
      />
      {errors.contact_number && <Text style={tw`text-red-500 mb-4`}>{errors.contact_number}</Text>}

      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
}
