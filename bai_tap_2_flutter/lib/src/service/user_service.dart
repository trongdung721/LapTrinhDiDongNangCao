import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:bai_tap_2_flutter/src/api/api_service.dart';
import 'package:bai_tap_2_flutter/src/api/response_dto.dart';


class UserService {
  final ApiService _apiService = ApiService();

  Future<ResponseDto> login(String username, String password) async {
    final response = await _apiService.post(
      "/v1/user/login",
      {'username': username, 'password': password},
      requiresAuth: false,
    );
    final dto = ResponseDto.fromJson(jsonDecode(response.body));
    if (dto.result) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('accessToken', dto.data['accessToken']);
      return dto;
    }
    return dto;
  }

  Future<ResponseDto> forgotPassword(String email) async {
    final response = await _apiService.post(
      "/v1/user/forgot-password",
      {'email': email},
      requiresAuth: false,
    );
    final dto = ResponseDto.fromJson(jsonDecode(response.body));
    return dto;
  }

  Future<ResponseDto> resetPassword(
      String email, String newPassword, String otp) async {
    final response = await _apiService.post(
      "/v1/user/reset-password",
      {'email': email, 'newPassword': newPassword, 'otp': otp},
      requiresAuth: false,
    );
    final dto = ResponseDto.fromJson(jsonDecode(response.body));
    return dto;
  }
Future<ResponseDto> register(
      String displayName,
      String email,
      String password,
      String phone,
      String studentId) async {
    final response = await _apiService.post(
      "/v1/user/register",
      {
        'displayName': displayName,
        'email': email,
        'password': password,
        'phone': phone,
        'studentId': studentId,
      },
      requiresAuth: false,
    );
    final dto = ResponseDto.fromJson(jsonDecode(response.body));
    return dto;
  }
Future<ResponseDto> verify(
      String email,
      String otp) async {
    final response = await _apiService.post(
      "/v1/user/verify",
      {
        'email': email,
        'otp': otp,
      },
      requiresAuth: false,
    );
    final dto = ResponseDto.fromJson(jsonDecode(response.body));
    return dto;
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('accessToken');
  }
  Future<bool> verifyToken() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('accessToken');
    if (token == null) {
      await prefs.remove('accessToken');
      return false;
    }
    try {
      final response = await _apiService.post(
        '/v1/user/verify-token',
        {'accessToken': token},
        requiresAuth: false,
      );
      if (response.statusCode == 200) {
        return true;
      }
    } catch (ignored) {}
    await prefs.remove('accessToken');
    return false;
  }
}