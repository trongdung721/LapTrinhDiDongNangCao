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
      const response = await fetch('https://realtime-chat-app-api-tbaf.onrender.com/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.data && data.data.accessToken) {
        // Lưu accessToken vào AsyncStorage
        await AsyncStorage.setItem('accessToken', data.data.accessToken);

        Alert.alert('Đăng nhập thành công!', `Chào mừng!`);
        router.push('/ProfilePage'); // Điều hướng đến trang hồ sơ
      } else {
        Alert.alert('Đăng nhập thất bại', data.message || 'Vui lòng kiểm tra lại email và mật khẩu');
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
        placeholder="Nhập email của bạn"
      />
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Mật khẩu:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Nhập mật khẩu của bạn"
      />
      <TouchableOpacity
        style={[t.bgBlue500, t.roundedLg, t.pY3, t.mB5]}
        onPress={handleLogin}
      >
        <Text style={[t.textWhite, t.textCenter, t.fontBold]}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Thêm nút chuyển sang trang đăng ký */}
      <TouchableOpacity 
        style={[t.bgGray200, t.roundedLg, t.pY3]}
        onPress={() => router.push('/RegisterPage')}  // Điều hướng sang trang đăng ký
      >
        <Text style={[t.textCenter, t.textBlue500]}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}
