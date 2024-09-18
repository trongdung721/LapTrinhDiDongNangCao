import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterPage() {
  const [displayName, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://realtime-chat-app-api-tbaf.onrender.com/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ displayName, email, password, phone }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Account registered successfully.");
        // Chuyển đến trang OTP và truyền email qua tham số
        router.push({
          pathname: '/OtpVerificationPage',
          params: { email }, // Truyền email qua params
        });
      } else {
        Alert.alert("Error", "Registration failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' }}>
      <Text>Name:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={displayName}
        onChangeText={setName}
      />
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
      <Text>Phone:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <View style={{ marginBottom: 20 }}>
        <Button title="Đăng ký" onPress={handleRegister} />
      </View>
      <View>
        <Button title="Đã có tài khoản? Đăng nhập" onPress={() => router.push('/LoginPage')} />
      </View>
    </View>
  );
}
