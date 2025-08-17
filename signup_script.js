// assets/js/signup_script.js

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');
    const createAccountBtn = document.querySelector('.btn-create-account');
    const googleSignupBtn = document.querySelector('.btn-google-signup');

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

            const name = document.getElementById('name').value;
            const emailPhone = document.getElementById('email_phone').value;
            const password = document.getElementById('password').value;

            // Basic validation (có thể thêm validation phức tạp hơn sau này)
            if (name.trim() === '' || emailPhone.trim() === '' || password.trim() === '') {
                alert('Vui lòng điền đầy đủ tất cả các trường!');
                return;
            }

            console.log('Thông tin đăng ký:');
            console.log('Tên:', name);
            console.log('Email/SĐT:', emailPhone);
            console.log('Mật khẩu:', password);

            // Ở đây bạn sẽ thêm logic gửi dữ liệu đăng ký lên backend API
            // Ví dụ:
            // fetch('/api/register.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ name, emailPhone, password })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         alert('Đăng ký thành công!');
            //         window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
            //     } else {
            //         alert('Đăng ký thất bại: ' + (data.message || 'Có lỗi xảy ra.'));
            //     }
            // })
            // .catch(error => {
            //     console.error('Lỗi khi gửi dữ liệu:', error);
            //     alert('Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.');
            // });

            alert('Đăng ký thành công! (Đây là demo, dữ liệu chưa được gửi lên server)');
            signupForm.reset(); // Đặt lại form sau khi đăng ký (hoặc chuyển hướng trang)
        });
    }

    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', () => {
            alert('Chức năng đăng ký bằng Google sẽ được tích hợp sau!');
            // Ở đây bạn sẽ thêm logic tích hợp đăng nhập bằng Google (Firebase Auth, Google API Client, v.v.)
        });
    }
});
