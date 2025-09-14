// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.classList.toggle('nav-open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('nav-open');
            body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('nav-open');
            body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('nav-open');
            body.style.overflow = 'auto';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.about-card, .gallery-item, .video-item, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Enhanced parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');
        const rate = scrolled * -0.3;
        const imageRate = scrolled * -0.1;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${imageRate}px) scale(1.05)`;
        }
    });
    
    // Hero images loading and transition effect
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;
    let imageTransitionInterval;
    
    console.log(`Found ${heroImages.length} hero images`);
    
    if (heroImages.length > 0) {
        // Set initial states - first image should be visible
        heroImages.forEach((img, index) => {
            img.addEventListener('load', function() {
                console.log(`Hero image ${index} loaded`);
                if (index === 0) {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                }
            });
            
            // Ensure first image is visible immediately
            if (index === 0) {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                img.style.transition = 'opacity 1s ease, transform 1s ease';
            } else {
                img.style.opacity = '0';
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'opacity 1s ease, transform 1s ease';
            }
        });
        
        // Image transition function
        function transitionToNextImage() {
            const nextIndex = (currentImageIndex + 1) % heroImages.length;
            transitionToImage(nextIndex);
        }
        
        function transitionToImage(imageIndex) {
            const currentImg = heroImages[currentImageIndex];
            const nextImg = heroImages[imageIndex];
            
            // Update indicators
            document.querySelectorAll('.hero-indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === imageIndex);
            });
            
            // Fade out current image
            currentImg.style.opacity = '0';
            currentImg.style.transform = 'scale(1.1)';
            
            // Fade in next image
            setTimeout(() => {
                nextImg.style.opacity = '1';
                nextImg.style.transform = 'scale(1)';
                nextImg.style.zIndex = '1';
                currentImg.style.zIndex = '0';
                
                currentImageIndex = imageIndex;
            }, 500);
        }
        
        // Add click handlers for indicators
        document.querySelectorAll('.hero-indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (imageTransitionInterval) {
                    clearInterval(imageTransitionInterval);
                }
                transitionToImage(index);
                
                // Restart auto-transition after 3 seconds
                setTimeout(() => {
                    if (heroImages.length > 1) {
                        imageTransitionInterval = setInterval(transitionToNextImage, 5000);
                    }
                }, 3000);
            });
        });
        
        // Force first image to be visible
        const firstImage = heroImages[0];
        if (firstImage) {
            firstImage.style.opacity = '1';
            firstImage.style.transform = 'scale(1)';
            firstImage.style.zIndex = '1';
        }
        
        // Start image transitions after 3 seconds
        setTimeout(() => {
            if (heroImages.length > 1) {
                imageTransitionInterval = setInterval(transitionToNextImage, 5000);
            }
        }, 3000);
        
        // Pause transitions on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                if (imageTransitionInterval) {
                    clearInterval(imageTransitionInterval);
                }
            });
            
            heroSection.addEventListener('mouseleave', () => {
                if (heroImages.length > 1) {
                    imageTransitionInterval = setInterval(transitionToNextImage, 5000);
                }
            });
        }
    }
    
    // Video play functionality
    window.playVideo = function(button) {
        const videoContainer = button.closest('.video-container');
        const video = videoContainer.querySelector('video');
        const overlay = videoContainer.querySelector('.video-overlay');
        
        if (video.paused) {
            video.play();
            overlay.classList.add('hidden');
            
            // Pause other videos
            document.querySelectorAll('video').forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                    v.closest('.video-container').querySelector('.video-overlay').classList.remove('hidden');
                }
            });
        } else {
            video.pause();
            overlay.classList.remove('hidden');
        }
    };
    
    // Lightbox functionality
    window.openLightbox = function(imageSrc) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // Close lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            this.reset();
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 3000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Video lazy loading
    const videos = document.querySelectorAll('video');
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.load();
                videoObserver.unobserve(video);
            }
        });
    });
    
    videos.forEach(video => {
        video.load = function() {
            // Video is already loaded when it comes into view
        };
        videoObserver.observe(video);
    });
    
    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-based animations and effects
            updateScrollProgress();
        }, 10);
    });
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update any scroll-based indicators
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator && scrollPercent > 10) {
            scrollIndicator.style.opacity = '0';
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    }
    
    // Preload critical resources
    function preloadResources() {
        const criticalImages = [
            'Images/2025-09-14 12.18.26.jpg',
            'Images/IMG_5250.jpeg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadResources();
    
    // Service Worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
    
    // Add loading states
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Hide loading spinner if exists
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
    
    // Error handling for media
    document.querySelectorAll('img, video').forEach(media => {
        media.addEventListener('error', function() {
            console.warn('Failed to load media:', this.src);
            // You could add a placeholder image here
        });
    });
    
    // Add touch support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up
                console.log('Swipe up detected');
            } else {
                // Swipe down
                console.log('Swipe down detected');
            }
        }
    }
});

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for global access
window.ArsenNercesyan = {
    playVideo: window.playVideo,
    openLightbox: window.openLightbox,
    showNotification: function(message, type) {
        // This will be available after DOM is loaded
        if (typeof showNotification !== 'undefined') {
            showNotification(message, type);
        }
    }
};
