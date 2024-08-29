import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const router = useRouter();
  const avatar = require('../../assets/images/avatar.jpg');
  const [timeLeft, setTimeLeft] = useState<number>(10);

  useEffect(() => {
    setTimeLeft(10);
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            router.push('/(tabs)/LoginPage');
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Image
        source={avatar}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text>Name: Lê Trọng Dũng</Text>
      <Text>Email: 21110157@student.hcmute.edu.vn</Text>
      <Text>Phone: 0962904408</Text>
      <Text style={{ marginTop: 20 }}>
        Sau {timeLeft} giây sẽ chuyển về trang Đăng nhập...
      </Text>
    </View>
  );
}
