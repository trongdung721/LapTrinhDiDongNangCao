import 'package:flutter/material.dart';
import 'package:bai_tap_2_flutter/src/screens/login.dart';

class MemberIntroductionPage extends StatelessWidget {
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
            ElevatedButton(
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => LoginPage()),
                );
              },
              child: Text('Chuyển đến trang Đăng Nhập'),
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
