// import 'package:shared_preferences/shared_preferences.dart';

// import '../api/api_service.dart';

// class AuthService {
//   static const String TOKEN_KEY = 'access_token';
//   final ApiService _apiService = ApiService();

//   // Singleton pattern
//   static final AuthService _instance = AuthService._internal();
  
//   factory AuthService() {
//     return _instance;
//   }
  
//   AuthService._internal();

//   // Lưu token
//   Future<void> saveToken(String token) async {
//     final prefs = await SharedPreferences.getInstance();
//     await prefs.setString(TOKEN_KEY, token);
//   }

//   // Lấy token
//   Future<String?> getToken() async {
//     final prefs = await SharedPreferences.getInstance();
//     return prefs.getString(TOKEN_KEY);
//   }

//   // Xóa token
//   Future<void> removeToken() async {
//     final prefs = await SharedPreferences.getInstance();
//     await prefs.remove(TOKEN_KEY);
//   }

//   // Verify token
//   Future<bool> verifyToken() async {
//     try {
//       final token = await getToken();
//       if (token == null) return false;

//       final response = await _apiService.post(
//         '/v1/user/verify-token',
//         body: {'accessToken': token},
//       );
      
//       return true; // Nếu verify thành công
//     } catch (e) {
//       await removeToken(); // Xóa token nếu không hợp lệ
//       return false;
//     }
//   }

//   // Kiểm tra trạng thái đăng nhập
//   Future<bool> isLoggedIn() async {
//     final token = await getToken();
//     return token != null;
//   }
// }