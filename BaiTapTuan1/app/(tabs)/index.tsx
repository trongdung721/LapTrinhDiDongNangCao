import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text>Home Page</Text>
      <Link href="/ProfilePage" asChild>
        <TouchableOpacity>
          <Text style={{ color: 'blue' }}>Go to Profile</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
