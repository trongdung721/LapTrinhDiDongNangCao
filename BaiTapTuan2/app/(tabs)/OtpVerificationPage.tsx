import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string>('');
  const { email } = useLocalSearchParams(); // Lấy email từ params
  const router = useRouter();

  // Kiểm tra email trong console khi component mount
  useEffect(() => {
    console.log('Email from params:', email);
  }, [email]);

  const handleVerifyOtp = async () => {
    console.log('Verifying OTP for email:', email); // Hiển thị email trong console trước khi gọi API
    console.log('Entered OTP:', otp); // Hiển thị OTP đã nhập

    try {
      const response = await fetch('https://realtime-chat-app-api-tbaf.onrender.com/v1/user/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      if (response.ok) {
        Alert.alert('Xác minh thành công!', 'Tài khoản của bạn đã được kích hoạt.');
        router.push('/LoginPage'); // Sau khi xác minh thành công, điều hướng về trang đăng nhập
      } else {
        const data = await response.json();
        Alert.alert('Xác minh thất bại', data.message || 'OTP không hợp lệ.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Nhập mã OTP:</Text>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginBottom: 20,
          paddingVertical: 8
        }}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          borderRadius: 10,
          paddingVertical: 12,
          marginBottom: 20,
        }}
        onPress={handleVerifyOtp}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Xác minh</Text>
      </TouchableOpacity>
    </View>
  );
}
