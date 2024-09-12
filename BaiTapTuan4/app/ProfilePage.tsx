import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: 'https://example.com/profile.jpg' }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text>Name: John Doe</Text>
      <Text>Email: johndoe@example.com</Text>
      <Text>Phone: 123-456-7890</Text>
    </View>
  );
}
