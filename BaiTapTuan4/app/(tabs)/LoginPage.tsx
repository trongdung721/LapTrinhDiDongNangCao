import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://food-app-api-demo.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('userId', data.user._id); // Save the user ID
        Alert.alert('Đăng nhập thành công!', `Chào mừng ${data.user.name}`);
        router.push('/ProfilePage'); // Navigate to the HomePage
      } else {
        Alert.alert('Đăng nhập thất bại', 'Vui lòng kiểm tra lại email và mật khẩu');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <View style={[t.flex1, t.justifyCenter, t.p5, t.bgWhite]}>
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Email:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Mật khẩu:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={[t.bgBlue500, t.roundedLg, t.pY3, t.mB5]}
        onPress={handleLogin}
      >
        <Text style={[t.textWhite, t.textCenter, t.fontBold]}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}
