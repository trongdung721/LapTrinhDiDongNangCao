import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const router = useRouter();
  const avatar = require('../../assets/images/avatar.jpg');
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/HomePage');
    }
  }, [timeLeft, router]);

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
        Sau {timeLeft} giây sẽ chuyển về trang HomePage...
      </Text>
    </View>
  );
}