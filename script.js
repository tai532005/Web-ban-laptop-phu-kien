// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.getElementById('product-list');
    const flashProductListContainer = document.getElementById('flash-product-list');
    const flashProductsInnerWrapper = document.getElementById('flash-products-inner-wrapper'); // Wrapper mới cho carousel Flash Sales
    const brandListContainer = document.getElementById('brand-list');
    const brandInnerWrapper = document.getElementById('brand-inner-wrapper'); // Wrapper mới cho carousel Thương hiệu
    const productTypeListContainer = document.getElementById('product-type-list');
    const productTypeInnerWrapper = document.getElementById('product-type-inner-wrapper'); // Wrapper mới cho carousel Loại sản phẩm
    const smallCategoryListContainer = document.getElementById('small-category-list');
    const gamingProductListContainer = document.getElementById('gaming-product-list'); // Container cho Laptop Gaming
    const studyOfficeProductListContainer = document.getElementById('study-office-product-list'); // Container cho Laptop Học tập - Văn phòng

    // Mảng các màu nền cho Flash Sales cards
    const flashSaleBackgroundColors = ['bg-light-blue', 'bg-light-red', 'bg-light-purple', 'bg-light-green', 'bg-light-orange', 'bg-light-pink', 'bg-light-grey', 'bg-light-cyan'];

    // Hàm để tạo các sao đánh giá
    const createStarRating = (rating) => {
        let starsHtml = '';
        // Lặp 5 lần để tạo 5 ngôi sao
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fas fa-star"></i>'; // Sao đầy nếu rating lớn hơn hoặc bằng i
            } else {
                starsHtml += '<i class="far fa-star"></i>'; // Sao rỗng nếu rating nhỏ hơn i
            }
        }
        return `<div class="star-rating">${starsHtml}</div>`;
    };

    // Hàm tạo thẻ sản phẩm cho Flash Sale với cấu trúc tùy chỉnh
    function createFlashSaleProductCard(product, colorClass) {
        const productCard = document.createElement('a');
        productCard.href = `product_detail.html?id=${product.id}`;
        productCard.classList.add('product-card', colorClass); // Thêm class màu nền

        // Định dạng giá tiền mới và cũ
        const formattedNewPrice = parseFloat(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        const formattedOldPrice = product.oldPrice ? parseFloat(product.oldPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '';

        productCard.innerHTML = `
            <div class="image-wrapper">
                ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                <img src="${product.image_url}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/300x200/${colorClass.replace('bg-light-', '').toUpperCase()}/000000?text=${product.name.replace(/\s/g, '+')}';">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="full-name">${product.fullName || ''}</p>
                <p class="new-price">${formattedNewPrice}</p>
                <p class="old-price">${formattedOldPrice}</p>
                ${createStarRating(product.rating || 0)}
                ${product.reviews ? `<span class="review-count">(${product.reviews})</span>` : ''}
                <button class="add-to-cart-btn">Thêm vào giỏ hàng</button>
            </div>
        `;

        // Bắt sự kiện click cho nút "Thêm vào giỏ hàng"
        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (event) => {
                event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a> (chuyển trang)
                alert(`Đã thêm "${product.fullName}" vào giỏ hàng! (Chức năng này sẽ được phát triển sau)`);
            });
        }
        return productCard;
    }


    // Hàm chung để render sản phẩm vào một container (áp dụng cho Our Products, Gaming Laptops, Study-Office Laptops)
    const renderProducts = (products, containerElement) => {
        containerElement.innerHTML = ''; // Xóa nội dung cũ trong container trước khi render

        if (products.length === 0) {
            containerElement.innerHTML = '<p>Không có sản phẩm nào để hiển thị.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('a');
            productCard.href = `product_detail.html?id=${product.id}`;
            productCard.classList.add('product-card');

            const formattedNewPrice = parseFloat(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            const formattedOldPrice = product.oldPrice ? parseFloat(product.oldPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '';
            const starsHtml = createStarRating(product.rating || 0);

            productCard.innerHTML = `
                <div class="image-container">
                    ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                    <div class="icon-overlay">
                        <i class="far fa-heart"></i>
                        <i class="far fa-eye"></i>
                    </div>
                    <img src="${product.image_url}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/300x250/CCCCCC/000000?text=No+Image';">
                    <button class="add-to-cart-hover-btn">Thêm vào giỏ hàng</button> <!-- Nút Thêm vào giỏ hàng khi hover -->
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="star-rating-and-reviews">
                        ${starsHtml}
                        ${product.reviews ? `<span class="review-count">(${product.reviews})</span>` : ''}
                    </div>
                    <div class="price">
                        <span class="new-price">${formattedNewPrice}</span>
                        ${product.oldPrice ? `<span class="old-price">${formattedOldPrice}</span>` : ''}
                    </div>
                </div>
            `;
            containerElement.appendChild(productCard);

            // Xử lý sự kiện click cho nút "Thêm vào giỏ hàng" trên hover
            const addToCartHoverBtn = productCard.querySelector('.add-to-cart-hover-btn');
            if (addToCartHoverBtn) {
                addToCartHoverBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    alert(`Đã thêm "${product.name}" vào giỏ hàng! (Chức năng này sẽ được phát triển sau)`);
                });
            }
        });
    };

    // Hàm để tải sản phẩm từ API backend cho phần "Sản phẩm của chúng tôi"
    const fetchOurProducts = async () => {
        const apiUrl = 'http://localhost/laptop_shop/api/products.php'; // Địa chỉ API của bạn

        try {
            const response = await fetch(apiUrl); // Gửi yêu cầu GET
            if (!response.ok) {
                throw new Error(`Lỗi HTTP: ${response.status}`); // Xử lý lỗi HTTP
            }
            const products = await response.json(); // Chuyển đổi phản hồi sang JSON
            renderProducts(products, productListContainer); // Render sản phẩm vào container
        } catch (error) {
            console.error('Không thể tải sản phẩm:', error);
            productListContainer.innerHTML = '<p style="color: red;">Không thể tải sản phẩm. Vui lòng kiểm tra kết nối API.</p>';
        }
    };

    // Dữ liệu mẫu cho phần "Flash Sales"
    const flashSaleProducts = [
        {
            id: 101,
            name: "Asus Vivobook",
            fullName: "Laptop Asus Vivobook Go 15",
            price: 11490000,
            oldPrice: 14490000,
            discount: 21,
            image_url: "https://placehold.co/300x200/90CAF9/000000?text=Asus+Vivobook",
            rating: 4,
            reviews: 88
        },
        {
            id: 102,
            name: "Acer Aspire",
            fullName: "Laptop Acer Aspire 5",
            price: 15490000,
            oldPrice: 20490000,
            discount: 24,
            image_url: "https://placehold.co/300x200/F3E5F5/000000?text=Acer+Aspire",
            rating: 4.5,
            reviews: 99
        },
        {
            id: 103,
            name: "ROG Mouse",
            fullName: "Mouse - Asus ROG Gladius 2",
            price: 1150000,
            oldPrice: 2290000,
            discount: 50,
            image_url: "https://placehold.co/300x200/EF9A9A/000000?text=ROG+Mouse",
            rating: 4,
            reviews: 65
        },
        {
            id: 104,
            name: "Lenovo Yoga",
            fullName: "Laptop Lenovo Yoga Pro 7",
            price: 40990000,
            oldPrice: 46990000,
            discount: 13,
            image_url: "https://placehold.co/300x200/B2DFDB/000000?text=Lenovo+Yoga",
            rating: 5,
            reviews: 99
        },
        {
            id: 105,
            name: "MSI Creator",
            fullName: "Laptop MSI Creator M16",
            price: 49990000,
            oldPrice: 80990000,
            discount: 39,
            image_url: "https://placehold.co/300x200/FCE4EC/000000?text=MSI+Creator",
            rating: 4.5,
            reviews: 72
        },
        {
            id: 106,
            name: "HP Envy",
            fullName: "Laptop HP Envy 13",
            price: 22500000,
            oldPrice: 28000000,
            discount: 19,
            image_url: "https://placehold.co/300x200/E8F5E9/000000?text=HP+Envy",
            rating: 4.5,
            reviews: 55
        },
        {
            id: 107,
            name: "Dell XPS",
            fullName: "Laptop Dell XPS 15",
            price: 35000000,
            oldPrice: 42000000,
            discount: 17,
            image_url: "https://placehold.co/300x200/FFF3E0/000000?text=Dell+XPS",
            rating: 5,
            reviews: 70
        },
        {
            id: 108,
            name: "Logitech G213",
            fullName: "Bàn phím Logitech G213",
            price: 890000,
            oldPrice: 1200000,
            discount: 25,
            image_url: "https://placehold.co/300x200/CFD8DC/000000?text=Logitech+G213",
            rating: 4,
            reviews: 40
        }
    ];

    // Dữ liệu mẫu cho phần "Laptop Gaming"
    const gamingLaptops = [
        {
            id: 301,
            name: "Acer Predator",
            fullName: "Laptop Acer Predator Helios 300",
            price: 54990000,
            oldPrice: 60000000,
            discount: 8,
            image_url: "https://placehold.co/300x250/000000/FFFFFF?text=Acer+Predator",
            rating: 4.5,
            reviews: 35
        },
        {
            id: 302,
            name: "Asus Gaming V16",
            fullName: "Laptop Asus Gaming V16 RTX 4060",
            price: 23990000,
            oldPrice: 28000000,
            discount: 14,
            image_url: "https://placehold.co/300x250/000000/FFFFFF?text=Asus+Gaming+V16",
            rating: 4,
            reviews: 95
        },
        {
            id: 303,
            name: "Acer Nitro V 15",
            fullName: "Laptop Acer Nitro V 15 i7",
            price: 21990000,
            oldPrice: 26000000,
            discount: 15,
            image_url: "https://placehold.co/300x250/000000/FFFFFF?text=Acer+Nitro+V+15",
            rating: 4.5,
            reviews: 326
        },
        {
            id: 304,
            name: "Asus Gaming VivoBook",
            fullName: "Laptop Asus Gaming VivoBook Pro 15",
            price: 15190000,
            oldPrice: 18000000,
            discount: 15,
            image_url: "https://placehold.co/300x250/000000/FFFFFF?text=Asus+VivoBook+Gaming",
            rating: 4,
            reviews: 145
        },
        {
            id: 305,
            name: "Asus TUF Gaming F16",
            fullName: "Laptop Asus TUF Gaming F16 RTX 4050",
            price: 21390000,
            oldPrice: 25000000,
            discount: 14,
            image_url: "https://placehold.co/300x250/000000/FFFFFF?text=Asus+TUF+F16",
            rating: 4.5,
            reviews: 65
        },
        {
            id: 306,
            name: "Gigabyte Gaming AI6",
            fullName: "Laptop Gigabyte Gaming AI6 i5",
            price: 24590000,
            oldPrice: 29000000,
            discount: 15,
            image_url: "https://placehold.co/300x250/000000/FFFFFF?text=Gigabyte+AI6",
            rating: 4,
            reviews: 35
        },
        {
            id: 307,
            name: "Asus Gaming V16 (2)",
            fullName: "Laptop Asus Gaming V16 i9",
            price: 22690000,
            oldPrice: 27000000,
            discount: 16,
            image_url: "https://placehold.co/300x250/000000/FFFFFF?text=Asus+Gaming+V16+(2)",
            rating: 4,
            reviews: 55
        },
        {
            id: 308,
            name: "Asus ROG Flow Z13",
            fullName: "Laptop Asus ROG Flow Z13 i9 RTX 4050",
            price: 79990000,
            oldPrice: 90000000,
            discount: 11,
            image_url: "https://placehold.co/300x250/000000/FFFFFF?text=Asus+ROG+Flow+Z13",
            rating: 4.5,
            reviews: 55
        }
    ];

    // Dữ liệu mẫu cho phần "Laptop Học tập - Văn phòng"
    const studyOfficeLaptops = [
        {
            id: 401,
            name: "Laptop Asus Zenbook 14",
            fullName: "Laptop Asus Zenbook 14 OLED",
            price: 29390000,
            oldPrice: 35000000,
            discount: 16,
            image_url: "https://placehold.co/300x250/ADD8E6/000000?text=Asus+Zenbook",
            rating: 4.5,
            reviews: 35
        },
        {
            id: 402,
            name: "Laptop Asus Vivobook 15",
            fullName: "Laptop Asus Vivobook 15 OLED",
            price: 15790000,
            oldPrice: 19990000,
            discount: 21,
            image_url: "https://placehold.co/300x250/90EE90/000000?text=Asus+Vivobook+15",
            rating: 4,
            reviews: 98
        },
        {
            id: 403,
            name: "Laptop Acer Aspire Lite 16",
            fullName: "Laptop Acer Aspire Lite 16 i5",
            price: 19990000,
            oldPrice: 24000000,
            discount: 17,
            image_url: "https://placehold.co/300x250/DDA0DD/000000?text=Acer+Aspire+Lite",
            rating: 4.5,
            reviews: 325
        },
        {
            id: 404,
            name: "Laptop Dell Inspiron",
            fullName: "Laptop Dell Inspiron 15",
            price: 21390000,
            oldPrice: 25000000,
            discount: 14,
            image_url: "https://placehold.co/300x250/FFB6C1/000000?text=Dell+Inspiron",
            rating: 4,
            reviews: 145
        },
        {
            id: 405,
            name: "Laptop Lenovo Yoga Pro 7",
            fullName: "Laptop Lenovo Yoga Pro 7 AMD",
            price: 39290000,
            oldPrice: 45000000,
            discount: 13,
            image_url: "https://placehold.co/300x250/F0E68C/000000?text=Lenovo+Yoga+Pro",
            rating: 5,
            reviews: 65
        },
        {
            id: 406,
            name: "Laptop LG Gram Book",
            fullName: "Laptop LG Gram Book 17Z90P",
            price: 14990000,
            oldPrice: 18000000,
            discount: 17,
            image_url: "https://placehold.co/300x250/AEEEEE/000000?text=LG+Gram+Book",
            rating: 4,
            reviews: 35
        },
        {
            id: 407,
            name: "Laptop HP Probook 440",
            fullName: "Laptop HP Probook 440 G10",
            price: 26990000,
            oldPrice: 30000000,
            discount: 10,
            image_url: "https://placehold.co/300x250/FFE4E1/000000?text=HP+Probook",
            rating: 4.5,
            reviews: 55
        },
        {
            id: 408,
            name: "Laptop Asus Vivobook S 14",
            fullName: "Laptop Asus Vivobook S 14 Flip",
            price: 17990000,
            oldPrice: 22000000,
            discount: 18,
            image_url: "https://placehold.co/300x250/D3D3D3/000000?text=Asus+Vivobook+S14",
            rating: 4,
            reviews: 55
        }
    ];

    // Dữ liệu mẫu cho phần "Thương hiệu"
    const brands = [
        { id: 'apple', name: 'Apple', image_url: 'https://placehold.co/100x100/F0F0F0/000000?text=Apple' },
        { id: 'acer', name: 'Acer', image_url: 'https://placehold.co/100x100/F0F0F0/000000?text=Acer' },
        { id: 'asus', name: 'ASUS', image_url: 'https://placehold.co/100x100/F0F0F0/000000?text=ASUS' },
        { id: 'dell', name: 'Dell', image_url: 'https://placehold.co/100x100/F0F0F0/000000?text=Dell' },
        { id: 'hp', name: 'HP', image_url: 'https://placehold.co/100x100/F0F0F0/000000?text=HP' },
        { id: 'lenovo', name: 'Lenovo', image_url: 'https://placehold.co/100x100/F0F0F0/000000?text=Lenovo' },
        { id: 'msi', name: 'MSI', image_url: 'https://placehold.co/100x100/F0F0F0/000000?text=MSI' },
        { id: 'microsoft', name: 'Microsoft', image_url: 'https://placehold.co/100x100/F0F0F0/000000?text=Microsoft' }
    ];

    // Hàm render cho thương hiệu (tạo thẻ DOM)
    const createBrandCardElement = (brand) => {
        const brandCard = document.createElement('div');
        brandCard.classList.add('brand-card');
        brandCard.innerHTML = `
            <img src="${brand.image_url}" alt="${brand.name} Logo" onerror="this.onerror=null;this.src='https://placehold.co/100x100/CCCCCC/000000?text=${brand.name}';">
            <span>${brand.name}</span>
        `;
        return brandCard;
    };

    // Dữ liệu mẫu cho phần "Loại sản phẩm" (Phụ kiện)
    const productTypes = [
        { id: 'mouse', name: 'Chuột', image_url: 'https://placehold.co/150x150/EEEEEE/333333?text=Chuot' },
        { id: 'keyboard', name: 'Bàn phím', image_url: 'https://placehold.co/150x150/EEEEEE/333333?text=Ban+phim' },
        { id: 'headphone', name: 'Tai nghe', image_url: 'https://placehold.co/150x150/EEEEEE/333333?text=Tai+nghe' },
        { id: 'usb', name: 'USB', image_url: 'https://placehold.co/150x150/EEEEEE/333333?text=USB' },
        { id: 'hdd', name: 'Ổ cứng', image_url: 'https://placehold.co/150x150/EEEEEE/333333?text=O+cung' },
        { id: 'monitor', name: 'Màn hình', image_url: 'https://placehold.co/150x150/EEEEEE/333333?text=Man+hinh' }
    ];

    // Hàm render cho loại sản phẩm (tạo thẻ DOM)
    const createProductTypeCardElement = (type) => {
        const typeCard = document.createElement('div');
        typeCard.classList.add('type-card');
        typeCard.innerHTML = `
            <img src="${type.image_url}" alt="${type.name} Icon" onerror="this.onerror=null;this.src='https://placehold.co/150x150/CCCCCC/000000?text=${type.name}';">
            <span>${type.name}</span>
        `;
        return typeCard;
    };

    // Dữ liệu mẫu cho phần "Small Categories" (CPU, Ram, etc.)
    const smallCategories = [
        { id: 'cpu', name: 'CPU', image_url: 'https://placehold.co/80x80/E0E0E0/333333?text=CPU' },
        { id: 'ram', name: 'Ram', image_url: 'https://placehold.co/80x80/E0E0E0/333333?text=RAM' },
        { id: 'storage', name: 'Ổ cứng', image_url: 'https://placehold.co/80x80/E0E0E0/333333?text=HDD' },
        { id: 'keyboard_acc', name: 'Bàn phím', image_url: 'https://placehold.co/80x80/E0E0E0/333333?text=Keyboard' },
        { id: 'mouse_acc', name: 'Chuột máy tính', image_url: 'https://placehold.co/80x80/E0E0E0/333333?text=Mouse' },
        { id: 'headphone_acc', name: 'Tai nghe', image_url: 'https://placehold.co/80x80/E0E0E0/333333?text=Headphone' }
    ];

    // Hàm render cho các danh mục nhỏ
    const renderSmallCategories = (categoriesData, containerElement) => {
        containerElement.innerHTML = '';
        categoriesData.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('small-category-card');
            categoryCard.innerHTML = `
                <img src="${category.image_url}" alt="${category.name} Icon" onerror="this.onerror=null;this.src='https://placehold.co/80x80/CCCCCC/000000?text=${category.name}';">
                <span>${category.name}</span>
            `;
            containerElement.appendChild(categoryCard);
        });
    };

    // --- Generic Carousel Function ---
    const createCarousel = (containerWrapper, dataArray, createCardFunc, visibleItemsCount, slideInterval) => {
        let currentItemIndex = 0;
        let intervalId;
        let items = []; // To store actual DOM elements, including clones

        const renderCarouselItems = () => {
            containerWrapper.innerHTML = ''; // Clear existing items
            items = []; // Clear array

            // Render original items
            dataArray.forEach((item, index) => {
                const card = createCardFunc(item, index);
                containerWrapper.appendChild(card);
                items.push(card);
            });

            // Clone items for seamless looping (clone enough to fill the view after initial items)
            // We clone more than visibleItemsCount to ensure smooth transition back
            const clonesNeeded = visibleItemsCount * 2; // Clone enough for smooth loop
            for (let i = 0; i < clonesNeeded; i++) {
                const itemToClone = dataArray[i % dataArray.length];
                const clonedCard = createCardFunc(itemToClone, i % dataArray.length);
                containerWrapper.appendChild(clonedCard);
                items.push(clonedCard);
            }
        };

        const slide = (direction) => {
            const firstItem = items[0];
            if (!firstItem) return;

            const itemWidth = firstItem.offsetWidth;
            const style = getComputedStyle(containerWrapper);
            const gap = parseFloat(style.gap) || 0;
            const slideAmount = itemWidth + gap;

            if (direction === 'next') {
                currentItemIndex++;
            } else if (direction === 'prev') {
                currentItemIndex--;
            }

            containerWrapper.style.transform = `translateX(-${currentItemIndex * slideAmount}px)`;
            containerWrapper.style.transition = 'transform 0.5s ease-in-out';

            // Loop forward: If we've passed the original items, reset to the start of the original data block (visually seamless)
            if (currentItemIndex >= dataArray.length) {
                setTimeout(() => {
                    containerWrapper.style.transition = 'none'; // Temporarily disable transition
                    currentItemIndex = 0; // Reset index to the start of original items
                    containerWrapper.style.transform = `translateX(-${currentItemIndex * slideAmount}px)`;
                    // Re-enable transition after a very short delay
                    setTimeout(() => {
                        containerWrapper.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500); // Wait for the current transition to complete
            }
            // Loop backward: If we've gone before the first item, jump to the end of the original data block
            else if (currentItemIndex < 0) {
                setTimeout(() => {
                    containerWrapper.style.transition = 'none'; // Temporarily disable transition
                    currentItemIndex = dataArray.length - 1; // Jump to the last original item
                    containerWrapper.style.transform = `translateX(-${currentItemIndex * slideAmount}px)`;
                    setTimeout(() => {
                        containerWrapper.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500); // Wait for the current transition to complete
            }
        };

        const startAutoSlide = () => {
            stopAutoSlide(); // Clear any existing interval
            intervalId = setInterval(() => slide('next'), slideInterval);
        };

        const stopAutoSlide = () => {
            clearInterval(intervalId);
        };

        // Initial setup for the carousel
        renderCarouselItems();
        startAutoSlide(); // Start auto-sliding on load

        // Event listeners for hover to pause/resume auto-slide
        containerWrapper.addEventListener('mouseenter', stopAutoSlide);
        containerWrapper.addEventListener('mouseleave', startAutoSlide);

        return {
            slideNext: () => slide('next'),
            slidePrev: () => slide('prev'),
            startAutoSlide,
            stopAutoSlide
        };
    };

    // Initialize carousel instances (store them globally or in a scope accessible by event listeners)
    let flashSaleCarousel;
    let brandCarousel;
    let productTypeCarousel;

    // Tải sản phẩm thông thường khi trang được tải xong
    fetchOurProducts();

    // Tải các danh mục nhỏ khi trang được tải xong
    renderSmallCategories(smallCategories, smallCategoryListContainer);

    // Tải sản phẩm Gaming khi trang được tải xong
    renderProducts(gamingLaptops, gamingProductListContainer);

    // Tải sản phẩm Học tập - Văn phòng khi trang được tải xong
    renderProducts(studyOfficeLaptops, studyOfficeProductListContainer);


    // Logic cho đồng hồ đếm ngược thời gian thực (Giữ nguyên)
    const countdownItems = document.querySelectorAll('.countdown-item span');
    const flashSaleEndTime = new Date();
    flashSaleEndTime.setDate(flashSaleEndTime.getDate() + 3); // Sale kết thúc sau 3 ngày
    flashSaleEndTime.setHours(23, 59, 59, 999); // Kết thúc vào cuối ngày thứ 3

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = flashSaleEndTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (countdownItems[0]) countdownItems[0].textContent = String(days).padStart(2, '0');
        if (countdownItems[1]) countdownItems[1].textContent = String(hours).padStart(2, '0');
        if (countdownItems[2]) countdownItems[2].textContent = String(minutes).padStart(2, '0');
        if (countdownItems[3]) countdownItems[3].textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (countdownItems[0]) countdownItems[0].textContent = '00';
            if (countdownItems[1]) countdownItems[1].textContent = '00';
            if (countdownItems[2]) countdownItems[2].textContent = '00';
            if (countdownItems[3]) countdownItems[3].textContent = '00';
            console.log("Flash Sale đã kết thúc!");
        }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    const viewAllProductsBtn = document.querySelector('.view-all-products-btn');
    if (viewAllProductsBtn) {
        viewAllProductsBtn.addEventListener('click', () => {
            alert('Chuyển đến trang xem tất cả sản phẩm Flash Sales! (Chức năng này sẽ được phát triển sau)');
        });
    }

    // --- Khởi tạo các Carousels ---
    // Flash Sales Carousel
    if (flashProductsInnerWrapper) {
        setTimeout(() => {
            flashSaleCarousel = createCarousel(flashProductsInnerWrapper, flashSaleProducts, (product, index) => {
                const colorClass = flashSaleBackgroundColors[index % flashSaleBackgroundColors.length];
                return createFlashSaleProductCard(product, colorClass);
            }, 6, 4000); // 6 visible items, 4s interval for auto-slide
        }, 500);
    }

    // Brands Carousel
    if (brandInnerWrapper) {
        setTimeout(() => {
            brandCarousel = createCarousel(brandInnerWrapper, brands, createBrandCardElement, 6, 4000); // 6 visible items, 4s interval
        }, 500);
    }

    // Product Types Carousel
    if (productTypeInnerWrapper) {
        setTimeout(() => {
            productTypeCarousel = createCarousel(productTypeInnerWrapper, productTypes, createProductTypeCardElement, 6, 5000); // 6 visible items, 5s interval
        }, 500);
    }

    // --- Cập nhật xử lý click cho các nút điều hướng (prev/next) của carousels ---
    document.querySelectorAll('.nav-arrow').forEach(button => {
        button.addEventListener('click', (e) => {
            const parentSection = e.target.closest('section');
            if (!parentSection) return;

            if (e.target.classList.contains('prev-deal')) {
                flashSaleCarousel?.slidePrev();
            } else if (e.target.classList.contains('next-deal')) {
                flashSaleCarousel?.slideNext();
            } else if (e.target.classList.contains('prev-brand')) {
                brandCarousel?.slidePrev();
            } else if (e.target.classList.contains('next-brand')) {
                brandCarousel?.slideNext();
            } else if (e.target.classList.contains('prev-type')) {
                productTypeCarousel?.slidePrev();
            } else if (e.target.classList.contains('next-type')) {
                productTypeCarousel?.slideNext();
            }
            // Navigation for Gaming Laptops section
            else if (e.target.classList.contains('prev-gaming')) {
                alert('Chức năng điều hướng cho "Laptop Gaming" sẽ được phát triển sau!');
            } else if (e.target.classList.contains('next-gaming')) {
                alert('Chức năng điều hướng cho "Laptop Gaming" sẽ được phát triển sau!');
            }
            // Navigation for Study - Office Laptops section
            else if (e.target.classList.contains('prev-study-office')) {
                alert('Chức năng điều hướng cho "Laptop Học tập - Văn phòng" sẽ được phát triển sau!');
            } else if (e.target.classList.contains('next-study-office')) {
                alert('Chức năng điều hướng cho "Laptop Học tập - Văn phòng" sẽ được phát triển sau!');
            }
            // Our Products Navigation (if applicable)
            else if (parentSection.querySelector('#product-list')) {
                alert('Chức năng điều hướng cho "Sản phẩm của chúng tôi" sẽ được phát triển sau!');
            }
        });
    });

});
