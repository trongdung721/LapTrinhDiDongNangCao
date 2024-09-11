import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
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

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null); // Define the type as User or null
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [name, setName] = useState(''); // Name state for updating
  const [email, setEmail] = useState(''); // Email state for updating
  const [image, setImage] = useState(''); // Image URL state for updating

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
          setName(data.user.name); // Set initial state values for update fields
          setEmail(data.user.email);
          setImage(data.user.image || ''); // Optional image
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

  const handleUpdateProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`https://food-app-api-demo.onrender.com/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          image,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData.user); // Update the userData with new info
        Alert.alert('Profile updated successfully!');
        setIsModalVisible(false); // Close the modal after success
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

      {/* Button to trigger modal */}
      <TouchableOpacity
        style={[t.mT4, t.bgBlue500, t.pY2, t.pX4, t.roundedLg]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[t.textWhite]}>Update Profile</Text>
      </TouchableOpacity>

      {/* Modal for profile update */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[t.flex1, t.justifyCenter, t.p5, t.bgWhite]}>
          <Text style={[t.textLg, t.fontBold, t.mB4]}>Update Profile</Text>

          <Text style={[t.textBase, t.fontBold]}>Name:</Text>
          <TextInput
            style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
            value={name}
            onChangeText={setName}
          />

          <Text style={[t.textBase, t.fontBold]}>Email:</Text>
          <TextInput
            style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={[t.textBase, t.fontBold]}>Profile Image URL:</Text>
          <TextInput
            style={[t.borderB, t.borderGray300, t.mB5, t.pY2]}
            value={image}
            onChangeText={setImage}
          />

          <View style={[t.flexRow, t.justifyBetween]}>
            <TouchableOpacity
              style={[t.bgBlue500, t.pY3, t.pX4, t.roundedLg]}
              onPress={handleUpdateProfile}
            >
              <Text style={[t.textWhite, t.textCenter]}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[t.bgRed500, t.pY3, t.pX4, t.roundedLg]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={[t.textWhite, t.textCenter]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
