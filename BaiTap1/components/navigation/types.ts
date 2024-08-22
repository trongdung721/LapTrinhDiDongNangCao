
import { StackNavigationProp } from '@react-navigation/stack';

// Định nghĩa các tên màn hình của bạn
export type RootStackParamList = {
  Profile: undefined;
  Homepage: undefined;
};

// Định nghĩa kiểu navigation cho từng màn hình
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export type HomepageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Homepage'>;
