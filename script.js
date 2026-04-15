

document.addEventListener('DOMContentLoaded', function () {

    let currentSlide = 0;
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let autoSlideInterval;

   
    sliderItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        sliderItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        sliderItems[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % sliderItems.length;
        showSlide(currentSlide);
        resetAutoSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
        showSlide(currentSlide);
        resetAutoSlide();
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Pause auto-slide on hover
    document.querySelector('.hero-slider').addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    document.querySelector('.hero-slider').addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Start auto-slide
    startAutoSlide();

    /* ========================================
       Dark Mode Toggle
       ======================================== */
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Set initial theme
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        htmlElement.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', function () {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        if (newTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu on hamburger click
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu on window resize if screen is large enough
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* ========================================
       Smooth Scroll Enhancement
       ======================================== */
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementPosition - navHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ========================================
       CTA Button Interactions
       ======================================== */
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    /* ========================================
       Scroll Animations (Simple Fade-In)
       ======================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all service cards and about cards
    const animatedElements = document.querySelectorAll('.service-card, .about-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
