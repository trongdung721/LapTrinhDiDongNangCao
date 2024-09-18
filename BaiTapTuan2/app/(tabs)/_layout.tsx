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
        name="LoginPage"
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="RegisterPage"
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="HomePage"
        options={{ headerShown: false }}
    />
</Stack>
  );
}
