document.addEventListener('DOMContentLoaded', function () {
    // === FAQ & Messenger Logic ===
    const messengerBtn = document.getElementById('messengerBtn');
    const faqPopup = document.getElementById('faqPopup');

    if (messengerBtn && faqPopup) {
        messengerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            faqPopup.classList.toggle('show');
        });

        // Close FAQ when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.messenger-container') && !event.target.closest('.faq-popup')) {
                faqPopup.classList.remove('show');
            }
        });

        // Auto-close FAQ after 30 seconds of inactivity
        let faqTimer;
        function resetFaqTimer() {
            clearTimeout(faqTimer);
            faqTimer = setTimeout(() => {
                faqPopup.classList.remove('show');
            }, 30000);
        }

        // Reset timer on any interaction with FAQ
        faqPopup.addEventListener('mouseenter', resetFaqTimer);
        faqPopup.addEventListener('click', resetFaqTimer);
        resetFaqTimer();
    }

    // Initialize Bootstrap Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

    // === Preloader Logic ===
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 600); // Small delay for smooth transition
        });

        // Fallback for long loading pages
        setTimeout(() => {
            if (!preloader.classList.contains('fade-out')) {
                preloader.classList.add('fade-out');
            }
        }, 3000);
    }

    // === Product Slider Hover Auto-Scroll & Arrow Navigation ===
    const sliderWrappers = document.querySelectorAll('.product-slider-wrapper');
    sliderWrappers.forEach(wrapper => {
        const slider = wrapper.querySelector('.product-slider');
        const arrowLeft = wrapper.querySelector('.arrow-left');
        const arrowRight = wrapper.querySelector('.arrow-right');

        if (!slider) return;

        // Auto-scroll on hover (Step-by-Step "Round" effect)
        let isHovered = false;
        let stepInterval;
        const scrollStep = 300; // Amount to scroll each time (one card width + gap)

        function nextSlide() {
            if (isHovered) {
                const maxScroll = slider.scrollWidth - slider.clientWidth;
                let newScroll = slider.scrollLeft + scrollStep;

                if (newScroll >= maxScroll + 10) {
                    // Loop back to start smoothly
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Move to next product
                    slider.scrollTo({ left: newScroll, behavior: 'smooth' });
                }
            }
        }

        wrapper.addEventListener('mouseenter', () => {
            isHovered = true;
            nextSlide(); 
            stepInterval = setInterval(nextSlide, 2000); 
        });

        wrapper.addEventListener('mouseleave', () => {
            isHovered = false;
            clearInterval(stepInterval);
        });

        // Arrow navigation
        if (arrowLeft && arrowRight) {
            arrowLeft.addEventListener('click', () => {
                slider.scrollLeft -= 300;
            });
            arrowRight.addEventListener('click', () => {
                slider.scrollLeft += 300;
            });
        }
    });

    // === Mobile Menu Auto-Close ===
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuCollapse = document.getElementById('maid-menu-items');
    if (menuCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    const bsCollapse = new bootstrap.Collapse(menuCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }

    // Auto-update stock status and render products dynamically
    if (typeof window.PRODUCTS_DATA !== 'undefined') {
        renderDynamicProducts();
    }
});

// === Global Loading Utility ===
window.showLoading = function () {
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(overlay);
    }
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.hideLoading = function () {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Global Function for FAQ Answer Toggling
window.toggleAnswer = function (number) {
    const answer = document.getElementById('answer' + number);
    if (!answer) return;

    const isVisible = answer.classList.contains('show');

    // Close all answers first
    document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.classList.remove('show');
    });

    // Toggle the clicked answer
    if (!isVisible) {
        answer.classList.add('show');
    }
};

function renderDynamicProducts() {
    const grid = document.querySelector('.products-grid');
    const slider = document.querySelector('.product-slider');
    
    // Helper to create HTML for a product
    const createProductHTML = (id, p) => `
        <div class="product-card" data-id="${id}">
            <a href="product-detail.html?id=${id}">
                <div class="product-img">
                    <img src="${p.image}" alt="${p.name}" onerror="this.src='img/product/8.png'">
                    <span class="quick-view-btn"><i class="fa fa-eye"></i></span>
                </div>
            </a>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="rating">
                    <span style="color: gold;"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span> 
                    <span style="color: gray;">(Reviews: ${p.rating || 5})</span>
                </p>
                <p class="stock" style="color: ${p.inStock === false ? 'red' : '#00a859'} !important; font-weight: bold;">
                    <i class="${p.inStock === false ? 'fa fa-times-circle' : 'fa fa-check-circle'}"></i> 
                    ${p.inStock === false ? 'Out of stock' : 'In stock'}
                </p>
                <p class="price">
                    <span class="new-price" style="color:#000; font-weight: bold;">৳ ${p.price}</span>
                </p>
            </div>
        </div>
    `;

    // Render Grid (products.html)
    if (grid) {
        grid.innerHTML = '';
        for (let id in window.PRODUCTS_DATA) {
            grid.innerHTML += createProductHTML(id, window.PRODUCTS_DATA[id]);
        }
    }

    // Render Slider (index.html)
    if (slider) {
        slider.innerHTML = '';
        // For slider, just render the first 8 products as featured
        let count = 0;
        for (let id in window.PRODUCTS_DATA) {
            if (count >= 8) break;
            slider.innerHTML += createProductHTML(id, window.PRODUCTS_DATA[id]);
            count++;
        }
    }
}
