import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'react-native-tailwindcss';

// Define the shape of the user data
interface User {
  _id: string;
  name: string;
  email: string;
  image?: string; // Image is optional
}

export default function HomePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null); // Define the type as User or null

  // Fetch user data from AsyncStorage or API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert("Error", "User not found. Redirecting to login.");
          router.replace('/LoginPage');
          return;
        }

        const response = await fetch(`https://food-app-api-demo.onrender.com/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user); // Set the user data
        } else {
          Alert.alert("Error", "Failed to fetch user data.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    router.replace('/LoginPage');
  };

  if (!userData) {
    return (
      <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgWhite]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgWhite]}>
      <Image
        source={{ uri: userData.image ? userData.image : 'https://example.com/profile.jpg' }}
        style={[t.w24, t.h24, t.roundedFull]}
      />
      <Text style={[t.mT4, t.textLg, t.fontBold]}>Name: {userData.name}</Text>
      <Text style={[t.mT2, t.textBase]}>Email: {userData.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
