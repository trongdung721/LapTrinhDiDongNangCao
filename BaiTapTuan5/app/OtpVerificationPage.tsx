import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';
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
    <View style={[t.flex1, t.justifyCenter, t.p5, t.bgWhite]}>
      <Text style={[t.textLg, t.fontBold, t.mB2]}>Nhập mã OTP:</Text>
      <TextInput
        style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />
      <TouchableOpacity
        style={[t.bgBlue500, t.roundedLg, t.pY3, t.mB5]}
        onPress={handleVerifyOtp}
      >
        <Text style={[t.textWhite, t.textCenter, t.fontBold]}>Xác minh</Text>
      </TouchableOpacity>
    </View>
  );
}
