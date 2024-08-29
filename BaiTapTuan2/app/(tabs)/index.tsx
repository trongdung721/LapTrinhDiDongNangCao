import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const avatar = require('../../assets/images/avatar.jpg');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.replace('/ProfilePage');
    }
  }, [isMounted, router]);

  const handleLogout = () => {
    router.replace('/(tabs)/LoginPage'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Image
        source={avatar}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text>Name: Lê Trọng Dũng</Text>
      <Text>HomePage</Text>
      
      {/* */}
      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}
