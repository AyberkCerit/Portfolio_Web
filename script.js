/* STEP 4: JavaScript functionality */

// 1. Intersection Observer for Scroll Animations
// This provides the "elegant hover effects and make the site feel alive"
document.addEventListener('DOMContentLoaded', () => {

    // Select all sections to animate on scroll
    const hiddenElements = document.querySelectorAll('section, .project-card, .skill-list li');

    // Set initial state via CSS class if not already set
    hiddenElements.forEach(el => el.classList.add('fade-in'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS transition
                entry.target.classList.add('appear');

                // Unobserve after animating once to keep performance high
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing elements
    hiddenElements.forEach(element => {
        observer.observe(element);
    });

    // 2. Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // Sadece sınıf ekle
        } else {
            navbar.classList.remove('scrolled'); // Sadece sınıf çıkar
        }
    });

    // 3. Fallback Smooth Scrolling for Safari/older browsers
    // (CSS scroll-behavior: smooth handles most modern browsers)
    document.querySelectorAll('.nav-links a, .cta-group a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Only apply to internal links
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 4. About Me Language Toggle
    const aboutLangToggle = document.getElementById('about-lang-toggle');
    const langToggleText = document.getElementById('lang-toggle-text');
    const bioEn = document.getElementById('bio-en');
    const bioTr = document.getElementById('bio-tr');

    if (aboutLangToggle && bioEn && bioTr && langToggleText) {
        let isTurkish = false;

        aboutLangToggle.addEventListener('click', () => {
            isTurkish = !isTurkish; // Durumu tersine çevir (Toggle)

            if (isTurkish) {
                bioEn.style.display = 'none'; // İngilizceyi gizle
                bioTr.style.display = 'block'; // Türkçeyi göster
                langToggleText.innerText = 'Read in English';
            } else {
                bioTr.style.display = 'none'; // Türkçeyi gizle
                bioEn.style.display = 'block'; // İngilizceyi göster
                langToggleText.innerText = 'Türkçe Oku';
            }
        });
    }

});