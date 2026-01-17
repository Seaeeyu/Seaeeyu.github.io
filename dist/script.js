/**
 * คฑาวุธ มังเดชะ - Portfolio Website
 * JavaScript functionality for interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initPortfolioFilter();
    initContactForm();
    initAnimations();
    initScrollEffects();
});

/**
 * Navbar functionality
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Portfolio filtering functionality
 */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0 || portfolioItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            showNotification('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
            return;
        }
        
        // Create mailto link
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `ชื่อ: ${data.name}\n` +
            `อีเมล: ${data.email}\n\n` +
            `ข้อความ:\n${data.message}`
        );
        
        const mailtoLink = `mailto:khathawut.mdc@gmail.com?subject=${subject}&body=${body}`;
        
        // Show success notification
        showNotification('กำลังเปิดโปรแกรมส่งอีเมล...', 'success');
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        form.reset();
    });
}

/**
 * Form validation
 */
function validateForm(data) {
    const required = ['name', 'email', 'subject', 'message'];
    
    for (const field of required) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        return false;
    }
    
    return true;
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Notification system
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#2563EB'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    closeBtn.innerHTML = '&times;';
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Scroll-based animations
 */
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about-card, .skill-category, .stat-card, .timeline-item, .portfolio-item, .contact-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Scroll effects (navbar background, etc.)
 */
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const navHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Add loading state to buttons
 */
function addLoadingState(button) {
    const originalContent = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `
        <span class="loading-spinner"></span>
        กำลังส่ง...
    `;
    button.style.opacity = '0.7';
    
    return function removeLoadingState() {
        button.disabled = false;
        button.innerHTML = originalContent;
        button.style.opacity = '1';
    };
}

/**
 * Typing effect for hero text (optional enhancement)
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Counter animation for stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.round(current);
            if (isPercentage) {
                displayValue += '%';
            } else if (isPlus) {
                displayValue += '+';
            }
            
            counter.textContent = displayValue;
        }, stepTime);
    });
}

/**
 * Initialize counter animation when stats section is visible
 */
function initCounterAnimation() {
    const statsSection = document.querySelector('.about-stats');
    
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Initialize counter animation on load
document.addEventListener('DOMContentLoaded', initCounterAnimation);

/**
 * Parallax effect for hero section (subtle)
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    const avatar = document.querySelector('.avatar-container');
    
    if (!hero || !avatar) return;
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            avatar.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }, 10));
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', initParallax);

/**
 * Preload critical resources
 */
function preloadResources() {
    // Preload fonts
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap'
    ];
    
    fonts.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize preload
preloadResources();

/**
 * Handle image lazy loading
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

/**
 * Add CSS for lazy loading
 */
const lazyLoadStyles = document.createElement('style');
lazyLoadStyles.textContent = `
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(lazyLoadStyles);

/**
 * Accessibility improvements
 */
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'ข้ามไปยังเนื้อหาหลัก';
    
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #2563EB;
        color: white;
        padding: 8px 16px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark if not exists
    if (!document.querySelector('main')) {
        const main = document.createElement('main');
        main.id = 'main';
        
        // Move all section content to main
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            main.appendChild(section);
        });
        
        document.body.insertBefore(main, document.querySelector('.footer'));
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

/**
 * Performance monitoring (optional)
 */
function monitorPerformance() {
    if ('performance' in window && 'PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime.toFixed(2) + 'ms');
        });
        
        try {
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
            // LCP not supported in this browser
        }
        
        // Monitor First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime + 'ms');
            });
        });
        
        try {
            fidObserver.observe({ type: 'first-input', buffered: true });
        } catch (e) {
            // FID not supported in this browser
        }
    }
}

// Initialize performance monitoring (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    monitorPerformance();
}

/**
 * Console welcome message
 */
console.log(
    '%c Portfolio ของ คฑาวุธ มังเดชะ',
    'color: #2563EB; font-size: 20px; font-weight: bold;'
);
console.log(
    '%c สนใจร่วมงาน? ติดต่อ: khathawut.mdc@gmail.com',
    'color: #64748B; font-size: 14px;'
);
