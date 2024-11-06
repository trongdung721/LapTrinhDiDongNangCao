import 'package:flutter/material.dart';
import '../service/user_service.dart';

class OTPDialog extends StatefulWidget {
  final String email;
  final bool showError;
  final String? errorMessage;

  OTPDialog({
    required this.email, 
    this.showError = false,
    this.errorMessage,
  });

  @override
  _OTPDialogState createState() => _OTPDialogState();
}

class _OTPDialogState extends State<OTPDialog> {
  final _otpController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _otpController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Xác thực OTP'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Vui lòng nhập mã OTP đã được gửi đến email:'),
          Text(
            widget.email,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.blue,
            ),
          ),
          SizedBox(height: 16),
          TextField(
            controller: _otpController,
            decoration: InputDecoration(
              labelText: 'Mã OTP',
              border: OutlineInputBorder(),
              prefixIcon: Icon(Icons.security),
              errorText: widget.showError ? widget.errorMessage : null,
            ),
            keyboardType: TextInputType.number,
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop(null);
          },
          child: Text('Hủy'),
        ),
        ElevatedButton(
          onPressed: _isLoading 
              ? null 
              : () {
                  Navigator.of(context).pop(_otpController.text);
                },
          child: _isLoading
              ? SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : Text('Xác nhận'),
        ),
      ],
    );
  }
}

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _displayNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _phoneController = TextEditingController();
  final _studentIdController = TextEditingController();
  final _userService = UserService();
  bool _isLoading = false;

  Future<bool> _verifyOTP(String email) async {
    bool isVerified = false;
    String? errorMessage;

    while (!isVerified) {
      final String? otp = await showDialog<String>(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return OTPDialog(
            email: email,
            showError: errorMessage != null,
            errorMessage: errorMessage,
          );
        },
      );

      if (otp == null) {
        // Người dùng đã nhấn nút Hủy
        return false;
      }

      try {
        final verifyResponse = await _userService.verify(email, otp);
        if (verifyResponse.result) {
          isVerified = true;
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Xác thực thành công')),
          );
        } else {
          errorMessage = verifyResponse.message;
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Mã OTP không đúng: $errorMessage')),
          );
        }
      } catch (e) {
        errorMessage = 'Lỗi xác thực: ${e.toString()}';
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(errorMessage!)),
        );
      }
    }

    return true;
  }

  Future<void> _handleRegister() async {
    // Kiểm tra form
    if (_displayNameController.text.isEmpty ||
        _emailController.text.isEmpty ||
        _passwordController.text.isEmpty ||
        _phoneController.text.isEmpty ||
        _studentIdController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Vui lòng nhập đầy đủ thông tin')),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final response = await _userService.register(
        _displayNameController.text,
        _emailController.text,
        _passwordController.text,
        _phoneController.text,
        _studentIdController.text,
      );

      if (response.result) {
        // Hiển thị popup xác thực OTP
        final verified = await _verifyOTP(_emailController.text);
        if (verified) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Đăng ký thành công')),
          );
          Navigator.pop(context); // Trở về trang login
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(response.message)),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Đăng ký thất bại: ${e.toString()}')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  void dispose() {
    _displayNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _phoneController.dispose();
    _studentIdController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Đăng Ký'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Icon(
              Icons.app_registration,
              size: 70,
              color: Colors.blue,
            ),
            SizedBox(height: 16),
            Text(
              'Đăng Ký Tài Khoản',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 20),
            TextField(
              controller: _displayNameController,
              decoration: InputDecoration(
                labelText: 'Họ và tên',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.person),
              ),
            ),
            SizedBox(height: 10),
            TextField(
              controller: _emailController,
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.email),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: 10),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                labelText: 'Mật khẩu',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.lock),
              ),
              obscureText: true,
            ),
            SizedBox(height: 10),
            TextField(
              controller: _phoneController,
              decoration: InputDecoration(
                labelText: 'Số điện thoại',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.phone),
              ),
              keyboardType: TextInputType.phone,
            ),
            SizedBox(height: 10),
            TextField(
              controller: _studentIdController,
              decoration: InputDecoration(
                labelText: 'Mã số sinh viên',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.badge),
              ),
            ),
            SizedBox(height: 20),
            SizedBox(
              height: 50,
              child: ElevatedButton(
                onPressed: _isLoading ? null : _handleRegister,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: _isLoading
                    ? SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2,
                        ),
                      )
                    : Text(
                        'ĐĂNG KÝ',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}