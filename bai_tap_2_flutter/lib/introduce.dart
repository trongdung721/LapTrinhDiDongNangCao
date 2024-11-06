import 'package:flutter/material.dart';
import 'dart:async';
import 'package:bai_tap_2_flutter/src/screens/login.dart';

class MemberIntroductionPage extends StatefulWidget {
  @override
  _MemberIntroductionPageState createState() => _MemberIntroductionPageState();
}

class _MemberIntroductionPageState extends State<MemberIntroductionPage> {
  int _remainingSeconds = 10; 

  @override
  void initState() {
    super.initState();

    Timer.periodic(Duration(seconds: 1), (timer) {
      if (_remainingSeconds > 0) {
        setState(() {
          _remainingSeconds--;
        });
      } else {
        timer.cancel();
      }
    });

    Timer(Duration(seconds: 10), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => LoginPage()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Giới Thiệu Thành Viên Nhóm'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Danh Sách Thành Viên Nhóm',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            MemberCard(name: 'Lê Trọng Dũng', mssv: '21110157'),
            MemberCard(name: 'Võ Hữu Tài ', mssv: '21110294'),
            MemberCard(name: 'Nguyễn Trần Văn Trung ', mssv: '21110335'),
            MemberCard(name: 'Kiến Đức Trọng  ', mssv: '21110332'),
            SizedBox(height: 30),
            Text(
              'Chuyển sang trang đăng nhập sau $_remainingSeconds giây',
              style: TextStyle(fontSize: 16, color: Colors.red),
            ),
          ],
        ),
      ),
    );
  }
}

class MemberCard extends StatelessWidget {
  final String name;
  final String mssv;

  MemberCard({required this.name, required this.mssv});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
      child: ListTile(
        leading: Icon(Icons.person),
        title: Text(name),
        subtitle: Text(mssv),
      ),
    );
  }
}
