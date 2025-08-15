<?php
// api/products.php

// Header để cho phép truy cập từ mọi nguồn (CORS)
// Đây là quan trọng để frontend của bạn có thể gọi API này
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Nếu có yêu cầu OPTIONS (thường là preflight request của CORS), chỉ trả về header
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Bao gồm file kết nối cơ sở dữ liệu
include_once 'db_connect.php';

// Kiểm tra phương thức yêu cầu có phải là GET không
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Truy vấn SQL để lấy tất cả sản phẩm
    $sql = "SELECT id, name, price, image_url, description FROM products";
    $result = $conn->query($sql);

    $products = array(); // Mảng để lưu trữ các sản phẩm

    if ($result->num_rows > 0) {
        // Lặp qua từng hàng dữ liệu và thêm vào mảng sản phẩm
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    // Trả về dữ liệu dưới dạng JSON
    echo json_encode($products, JSON_UNESCAPED_UNICODE); // JSON_UNESCAPED_UNICODE để hỗ trợ tiếng Việt

} else {
    // Nếu không phải phương thức GET, trả về lỗi
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Phương thức không được phép."), JSON_UNESCAPED_UNICODE);
}

// Đóng kết nối cơ sở dữ liệu
$conn->close();
?>
