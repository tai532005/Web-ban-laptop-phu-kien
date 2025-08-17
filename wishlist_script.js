// assets/js/wishlist_script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Wishlist page script loaded.');

    // Custom Modal elements
    const customModal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // Function to show custom modal
    function showModal(message) {
        if (modalMessage && customModal) {
            modalMessage.textContent = message;
            customModal.style.display = 'flex'; // Use flex to center the modal content
        }
    }

    // Function to hide custom modal
    function hideModal() {
        if (customModal) {
            customModal.style.display = 'none';
        }
    }

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

    // Event listener for "Move All To Bag" button
    const moveAllBtn = document.querySelector('.move-all-to-bag-btn');
    if (moveAllBtn) {
        moveAllBtn.addEventListener('click', () => {
            showModal('Chức năng "Move All To Bag" sẽ được phát triển sau!');
        });
    }

    // Event listeners for delete and quick view icons
    document.querySelectorAll('.product-action-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            // Determine which icon was clicked based on its class
            const actionIcon = event.target;
            let actionText = '';
            if (actionIcon.classList.contains('fa-trash-alt')) {
                actionText = 'Xóa sản phẩm';
            } else if (actionIcon.classList.contains('fa-eye')) {
                actionText = 'Xem nhanh sản phẩm';
            }
            showModal(`Chức năng "${actionText}" sẽ được phát triển sau!`);
        });
    });

    // Event listeners for "Add to cart" buttons
    document.querySelectorAll('.add-to-cart-hover-btn').forEach(button => {
        button.addEventListener('click', () => {
            showModal('Chức năng "Thêm vào giỏ hàng" sẽ được phát triển sau!');
        });
    });

    // Handle the "See All" button for "Just For You" section
    const seeAllBtn = document.querySelector('.see-all-btn');
    if (seeAllBtn) {
        seeAllBtn.addEventListener('click', () => {
            showModal('Chức năng "See All" cho sản phẩm gợi ý sẽ được phát triển sau!');
        });
    }

    // Optional: Activate Wishlist icon in header (if you want it visually distinct)
    const wishlistIcon = document.querySelector('a[href="wishlist.html"] .fa-heart');
    if (wishlistIcon) {
        // You might define .active-icon in style.css for visual feedback
        // For example: .header-icons .fa-heart.active-icon { color: #e74c3c; }
        wishlistIcon.classList.add('active-icon');
    }
});
