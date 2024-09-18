import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack initialRouteName="index">
    <Stack.Screen
        name="index"
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="ProfilePage"
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="HomePage"
        options={{ headerShown: false }}
    />
</Stack>
  );
}
