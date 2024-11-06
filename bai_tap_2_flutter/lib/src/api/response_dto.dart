class ResponseDto {
  final bool result;
  final String message;
  final dynamic data;

  ResponseDto({required this.result, this.message = "", this.data});

  factory ResponseDto.fromJson(Map<String, dynamic> json) {
    return ResponseDto(
      result: json['result'],
      message: json['message'],
      data: json['data'],
    );
  }
}