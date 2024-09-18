import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://realtime-chat-app-api-tbaf.onrender.com/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // const accessToken = data.data.accessToken;
        // await AsyncStorage.setItem("accessToken", data.data.accessToken);

        Alert.alert("Login successful");

        router.replace("/HomePage");
      } else {
        Alert.alert("Login failed!", "Please check email and password again!");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again." + error);
    }
  };
  

  const handleSendOtp = async () => {
    try {
      const response = await fetch('https://realtime-chat-app-api-tbaf.onrender.com/v1/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (response.ok) {
        setOtpSent(true);
        Alert.alert('OTP đã được gửi!', 'Vui lòng kiểm tra email của bạn.');
      } else {
        const data = await response.json();
        Alert.alert('Lỗi', data.error || 'Không thể gửi OTP. Vui lòng thử lại.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('https://realtime-chat-app-api-tbaf.onrender.com/v1/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail, newPassword, otp }),
      });

      if (response.ok) {
        Alert.alert('Đặt lại mật khẩu thành công!', 'Bạn có thể đăng nhập bằng mật khẩu mới.');
        setShowResetPassword(false);
        resetResetPasswordForm(); 
      } else {
        const data = await response.json();
        Alert.alert('Đặt lại mật khẩu thất bại', data.error || 'Vui lòng kiểm tra lại thông tin.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const resetResetPasswordForm = () => {
    setResetEmail('');
    setNewPassword('');
    setOtp('');
    setOtpSent(false);
  };

  const handleOpenResetPasswordModal = () => {
    resetResetPasswordForm(); 
    setShowResetPassword(true);
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
        <Button title="Quên mật khẩu?" onPress={handleOpenResetPasswordModal} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Chưa có tài khoản? Đăng ký" onPress={() => router.push('/(tabs)/RegisterPage')} />
      </View>

      <Modal
        visible={showResetPassword}
        animationType="slide"
        onRequestClose={() => {
          setShowResetPassword(false);
          resetResetPasswordForm(); // Reset form when closing the modal
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' }}>
          <Text>Email:</Text>
          <TextInput
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
            value={resetEmail}
            onChangeText={setResetEmail}
            keyboardType="email-address"
          />
          <Button 
            title={otpSent ? "OTP đã gửi" : "Gửi OTP"}
            onPress={handleSendOtp} 
            disabled={otpSent}
          />
          <Text>Mật khẩu mới:</Text>
          <TextInput
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <Text>OTP:</Text>
          <TextInput
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <View style={{ marginBottom: 20 }}>
            <Button title="Đặt lại mật khẩu" onPress={handleResetPassword} />
          </View>
          <View>
            <Button title="Hủy" onPress={() => {
              setShowResetPassword(false);
              resetResetPasswordForm(); // Reset form when closing the modal
            }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
