// Profile.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Định nghĩa kiểu điều hướng
type RootStackParamList = {
  Profile: undefined;
  Homepage: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// Trang Profile
const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Homepage');
    }, 10000); // 10 giây

    return () => clearTimeout(timer); // Hủy timer khi component bị unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/avatar.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Tên: Lê Trọng Dũng</Text>
      <Text style={styles.info}>Email: 21110157@student.hcmute.edu.vn</Text>
      <Text style={styles.info}>Số điện thoại: 0962904408</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    marginTop: 5,
  },
});

// Trang Homepage
const Homepage: React.FC = () => {
  return (
    <View style={stylesHomepage.container}>
      <Text style={stylesHomepage.title}>Chào mừng đến với trang Homepage</Text>
      <Text style={stylesHomepage.info}>Đây là trang chính của ứng dụng.</Text>
    </View>
  );
}

const stylesHomepage = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
  },
});

// Tạo stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Homepage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
