<?php
// api/db_connect.php

// Thiết lập các thông số kết nối cơ sở dữ liệu
$servername = "localhost";
$username = "root"; // Tên người dùng mặc định của MySQL trong XAMPP
$password = "";     // Mật khẩu mặc định của MySQL trong XAMPP (thường là rỗng)
$dbname = "laptop_shop_db"; // Tên cơ sở dữ liệu bạn đã tạo

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    // Nếu kết nối thất bại, dừng script và hiển thị lỗi
    die("Connection failed: " . $conn->connect_error);
}

// Thiết lập charset là utf8mb4 để hỗ trợ tiếng Việt và emoji
$conn->set_charset("utf8mb4");

// Không đóng kết nối ở đây, sẽ đóng sau khi các thao tác hoàn tất
?>