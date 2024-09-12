import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'react-native-tailwindcss';

interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          Alert.alert("Error", "User not found. Redirecting to login.");
          router.replace('/LoginPage');
          return;
        }

        const response = await fetch(`https://realtime-chat-app-api-tbaf.onrender.com/v1/user/profile`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
          setName(data.data.name);
          setEmail(data.data.email);
          setImage(data.data.image || '');
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
    await AsyncStorage.removeItem('accessToken');
    router.replace('/LoginPage');
  };

  const handleUpdateProfile = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert("Error", "User not found.");
        return;
      }

      const response = await fetch(`https://realtime-chat-app-api-tbaf.onrender.com/v1/user/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          email,
          image,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData.data);
        Alert.alert('Profile updated successfully!');
        setIsModalVisible(false);
      } else {
        Alert.alert('Update failed', 'Please check your input and try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating the profile.');
    }
  };

  if (!userData) {
    return (
      <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.bgWhite]}>
        <Text style={[t.textLg, t.fontBold]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[t.flex1, t.p5, t.bgWhite]}>
      <View style={[t.itemsCenter]}>
        <Image
          source={{ uri: userData.image ? userData.image : 'https://example.com/profile.jpg' }}
          style={[t.w32, t.h32, t.roundedFull, t.mB4]}
        />
        <Text style={[t.text2xl, t.fontBold, t.mB2]}>Name: {userData.name}</Text>
        <Text style={[t.textLg, t.mB2]}>Email: {userData.email}</Text>
      </View>

      <TouchableOpacity
        style={[t.bgBlue500, t.roundedLg, t.pY3, t.pX5, t.mT6]}
        onPress={handleLogout}
      >
        <Text style={[t.textWhite, t.textCenter, t.textLg, t.fontBold]}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[t.bgGreen500, t.roundedLg, t.pY3, t.pX5, t.mT4]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[t.textWhite, t.textCenter, t.textLg, t.fontBold]}>Update Profile</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[t.flex1, t.justifyCenter, t.p5, t.bgWhite]}>
          <Text style={[t.text2xl, t.fontBold, t.mB4, t.textCenter]}>Update Profile</Text>

          <TextInput
            style={[t.borderB, t.borderGray300, t.mB4, t.pY2, t.textLg]}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />

          <TextInput
            style={[t.borderB, t.borderGray300, t.mB4, t.pY2, t.textLg]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TextInput
            style={[t.borderB, t.borderGray300, t.mB4, t.pY2, t.textLg]}
            value={image}
            onChangeText={setImage}
            placeholder="Profile Image URL"
          />

          <View style={[t.flexRow, t.justifyBetween, t.mT4]}>
            <TouchableOpacity
              style={[t.bgBlue500, t.pY3, t.pX5, t.roundedLg]}
              onPress={handleUpdateProfile}
            >
              <Text style={[t.textWhite, t.textCenter, t.fontBold]}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[t.bgRed500, t.pY3, t.pX5, t.roundedLg]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={[t.textWhite, t.textCenter, t.fontBold]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
