import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { useRouter } from 'expo-router';

export default function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch('https://food-app-api-demo.onrender.com/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        Alert.alert('Đăng ký thành công!', 'Bạn có thể đăng nhập ngay bây giờ.');
        router.push('/(tabs)/LoginPage');
      } else {
        Alert.alert('Đăng ký thất bại', 'Vui lòng kiểm tra lại thông tin.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <View style={[t.flex1, t.justifyCenter, t.p5, t.bgWhite]}>
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Name:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={name}
        onChangeText={setName}
      />
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Email:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Password:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={[t.bgBlue500, t.roundedLg, t.pY3, t.mB5]}
        onPress={handleRegister}
      >
        <Text style={[t.textWhite, t.textCenter, t.fontBold]}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[t.bgGray200, t.roundedLg, t.pY3]}
        onPress={() => router.push('/(tabs)/LoginPage')}
      >
        <Text style={[t.textCenter]}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}
