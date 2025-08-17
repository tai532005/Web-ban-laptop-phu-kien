// assets/js/login_script.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const loginBtn = document.querySelector('.btn-login');
    const googleLoginBtn = document.querySelector('.btn-google-login');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('login_password');

    // Custom Modal elements
    const customModal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // Function to show custom modal
    const showModal = (message) => {
        modalMessage.textContent = message;
        customModal.style.display = 'flex'; // Use flex to center the modal content
    };

    // Function to hide custom modal
    const hideModal = () => {
        customModal.style.display = 'none';
    };

    // Event listener for modal close button
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', hideModal);
    }

    // Close modal if user clicks outside of it
    if (customModal) {
        customModal.addEventListener('click', (event) => {
            if (event.target === customModal) {
                hideModal();
            }
        });
    }

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Toggle the eye icon
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }


    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

            const emailPhone = document.getElementById('login_email_phone').value;
            const password = document.getElementById('login_password').value;

            // Basic validation (có thể thêm validation phức tạp hơn sau này)
            if (emailPhone.trim() === '' || password.trim() === '') {
                showModal('Vui lòng điền đầy đủ tất cả các trường!');
                return;
            }

            console.log('Thông tin đăng nhập:');
            console.log('Email/SĐT:', emailPhone);
            console.log('Mật khẩu:', password);

            // Ở đây bạn sẽ thêm logic gửi dữ liệu đăng nhập lên backend API
            // Ví dụ:
            // fetch('/api/login.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ emailPhone, password })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         showModal('Đăng nhập thành công!');
            //         // window.location.href = 'index.html'; // Chuyển hướng về trang chủ
            //     } else {
            //         showModal('Đăng nhập thất bại: ' + (data.message || 'Sai tài khoản hoặc mật khẩu.'));
            //     }
            // })
            // .catch(error => {
            //     console.error('Lỗi khi gửi dữ liệu:', error);
            //     showModal('Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.');
            // });

            showModal('Đăng nhập thành công! (Đây là demo, dữ liệu chưa được gửi lên server)');
            loginForm.reset(); // Đặt lại form sau khi đăng nhập (hoặc chuyển hướng trang)
        });
    }

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            showModal('Chức năng đăng nhập bằng Google sẽ được tích hợp sau!');
            // Ở đây bạn sẽ thêm logic tích hợp đăng nhập bằng Google OAuth
        });
    }

});
