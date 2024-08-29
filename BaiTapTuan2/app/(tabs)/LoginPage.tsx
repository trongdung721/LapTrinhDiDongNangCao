import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
        Alert.alert('Đăng nhập thành công!', `Chào mừng ${data.user.name}`);
        router.push('/'); 
      } else {
        Alert.alert('Đăng nhập thất bại', 'Vui lòng kiểm tra lại email và mật khẩu');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' }}>
      <Text>Email:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text>Password:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={{ marginBottom: 20 }}>
        <Button title="Đăng nhập" onPress={handleLogin} />
      </View>
      <View>
        <Button title="Chưa có tài khoản? Đăng ký" onPress={() => router.push('/(tabs)/RegisterPage')} />
      </View>
    </View>
  );
}
