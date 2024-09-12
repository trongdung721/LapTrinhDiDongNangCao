import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { useRouter } from 'expo-router';

export default function RegisterPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ!');
      return;
    }

    try {
      const response = await fetch('https://realtime-chat-app-api-tbaf.onrender.com/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: name,
          email,
          password,
          phone,
        }),
      });

      if (response.ok) {
        Alert.alert('Đăng ký thành công!', 'Vui lòng kiểm tra email để xác minh OTP.');
        // Truyền email khi điều hướng tới OtpVerificationPage
        router.push({
          pathname: '/OtpVerificationPage',
          params: { email }, // Truyền email trong params
        });
      } else {
        const data = await response.json();
        Alert.alert('Đăng ký thất bại', data.message || 'Vui lòng kiểm tra lại thông tin.');
      }
    } catch (error) {
      const err = error as Error;
      Alert.alert('Lỗi', `Có lỗi xảy ra: ${err.message}. Vui lòng thử lại.`);
    }
  };

  return (
    <View style={[t.flex1, t.justifyCenter, t.p5, t.bgWhite]}>
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Tên hiển thị:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên hiển thị"
      />
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Email:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Nhập email"
      />
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Mật khẩu:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Nhập mật khẩu"
      />
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Số điện thoại:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Nhập số điện thoại"
      />
      <TouchableOpacity
        style={[t.bgBlue500, t.roundedLg, t.pY3, t.mB5]}
        onPress={handleRegister}
      >
        <Text style={[t.textWhite, t.textCenter, t.fontBold]}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[t.bgGray200, t.roundedLg, t.pY3]}
        onPress={() => router.push('/LoginPage')}
      >
        <Text style={[t.textCenter]}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>

    </View>
  );
}
