// import 'package:bai_tap_2_flutter/src/screens/home.dart';
// import 'package:flutter/material.dart';
// import '../service/auth_service.dart';
// import './login.dart';

// class SplashScreen extends StatefulWidget {
//   @override
//   _SplashScreenState createState() => _SplashScreenState();
// }

// class _SplashScreenState extends State<SplashScreen> {
//   final AuthService _authService = AuthService();

//   @override
//   void initState() {
//     super.initState();
//     _checkAuth();
//   }

//   Future<void> _checkAuth() async {
//     await Future.delayed(Duration(seconds: 2)); // Độ trễ để hiển thị splash screen
    
//     if (await _authService.verifyToken()) {
//       // Token hợp lệ, chuyển đến trang chính
//       Navigator.pushReplacement(
//         context,
//         MaterialPageRoute(builder: (context) => MemberIntroductionPage()),
//       );
//     } else {
//       // Token không hợp lệ hoặc không tồn tại, chuyển đến trang login
//       Navigator.pushReplacement(
//         context,
//         MaterialPageRoute(builder: (context) => LoginPage()),
//       );
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             CircularProgressIndicator(),
//             SizedBox(height: 16),
//             Text('Đang kiểm tra phiên đăng nhập...'),
//           ],
//         ),
//       ),
//     );
//   }
// }