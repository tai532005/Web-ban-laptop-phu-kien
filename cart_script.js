// assets/js/cart_script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Cart page script loaded.');

    // Custom Modal elements
    const customModal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // Cart Total elements
    const subtotalValueElement = document.querySelector('.subtotal-value');
    const totalAmountValueElement = document.querySelector('.total-amount-value');

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

    // Function to format price (add thousands separator and currency symbol)
    function formatPrice(price) {
        // Assuming price is a number
        return price.toLocaleString('vi-VN') + '₫';
    }

    // Function to update subtotal for a single row
    function updateRowSubtotal(row) {
        const quantityInput = row.querySelector('.quantity-input');
        const subtotalCell = row.querySelector('.subtotal-cell');

        // Get the base price from data-product-price attribute (cleaned from non-numeric chars)
        const basePriceString = row.dataset.productPrice;
        const basePrice = parseFloat(basePriceString); // Convert to number

        const quantity = parseInt(quantityInput.value, 10);

        if (!isNaN(basePrice) && !isNaN(quantity)) {
            const newSubtotal = basePrice * quantity;
            subtotalCell.textContent = formatPrice(newSubtotal);
            return newSubtotal; // Return the calculated subtotal
        } else {
            subtotalCell.textContent = 'N/A'; // Or handle error appropriately
            return 0;
        }
    }

    // Function to calculate and display overall cart total
    function updateCartTotal() {
        let overallSubtotal = 0;
        document.querySelectorAll('.cart-table tbody tr').forEach(row => {
            overallSubtotal += updateRowSubtotal(row); // Update each row and sum up
        });

        // Update displayed subtotal and total amount
        if (subtotalValueElement) {
            subtotalValueElement.textContent = formatPrice(overallSubtotal);
        }
        // Assuming shipping is free for now, total is same as subtotal
        if (totalAmountValueElement) {
            totalAmountValueElement.textContent = formatPrice(overallSubtotal);
        }
    }

    // Attach event listeners to quantity controls
    document.querySelectorAll('.quantity-control').forEach(control => {
        const quantityDownBtn = control.querySelector('.quantity-down');
        const quantityUpBtn = control.querySelector('.quantity-up');
        const quantityInput = control.querySelector('.quantity-input');
        const row = control.closest('tr'); // Get the parent table row

        quantityDownBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value, 10);
            if (currentValue > parseInt(quantityInput.min, 10)) {
                quantityInput.value = currentValue - 1;
                updateCartTotal(); // Recalculate overall total
            }
        });

        quantityUpBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value, 10);
            quantityInput.value = currentValue + 1;
            updateCartTotal(); // Recalculate overall total
        });

        quantityInput.addEventListener('change', () => {
            // Ensure quantity is at least min value (usually 1)
            if (parseInt(quantityInput.value, 10) < parseInt(quantityInput.min, 10)) {
                quantityInput.value = quantityInput.min;
            }
            updateCartTotal(); // Recalculate overall total
        });
    });

    // Handle "Update Cart" button click
    const updateCartBtn = document.querySelector('.update-cart-btn');
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', () => {
            updateCartTotal(); // Ensure all subtotals are fresh
            showModal('Giỏ hàng đã được cập nhật! (Chức năng này là demo)');
        });
    }

    // Handle "Apply Coupon" button click
    const applyCouponBtn = document.querySelector('.apply-coupon-btn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const couponCode = document.querySelector('.coupon-input').value;
            if (couponCode.trim() === '') {
                showModal('Vui lòng nhập mã giảm giá!');
            } else {
                showModal(`Đã áp dụng mã giảm giá: "${couponCode}" (Chức năng này là demo)`);
                // In a real application, you'd send this to the server and update totals
                // For demo, we just show a message.
            }
        });
    }

    // Handle "Proceed to checkout" button click
    const proceedToCheckoutBtn = document.querySelector('.proceed-to-checkout-btn');
    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', () => {
            showModal('Chuyển đến trang thanh toán! (Chức năng này là demo)');
            // In a real application, navigate to checkout page
            // window.location.href = 'checkout.html';
        });
    }

    // Initial calculation when page loads
    updateCartTotal();
});
