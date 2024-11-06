import 'package:bai_tap_2_flutter/src/screens/ForgotPasswordPage.dart';
import 'package:bai_tap_2_flutter/src/screens/login.dart';
import 'package:bai_tap_2_flutter/src/screens/home.dart'; // Thêm import cho trang Home
import 'package:bai_tap_2_flutter/src/screens/register.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Group Introduction App',
      home: LoginPage(),
      routes: {
        '/home': (context) => MemberIntroductionPage(), // Định nghĩa route cho trang Home
        '/login': (context) => LoginPage(),
        '/register': (context) => RegisterPage(),
        '/forgot-password': (context) => ForgotPasswordPage(),
      },
    );
  }
}
