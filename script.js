/* ==========================================================================
   ENGR. ZULFIQAR RABBANI - SENIOR LAND SURVEYOR PORTFOLIO JS
   Bug-Free, SEO/AEO/GEO Optimized, Accessible & High-Performance Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Page Preloader --- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const hidePreloader = () => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        };

        if (document.readyState === 'complete') {
            setTimeout(hidePreloader, 300);
        } else {
            window.addEventListener('load', () => setTimeout(hidePreloader, 300));
        }
    }

    /* --- 2. Floating Background Particles Canvas --- */
    const canvas = document.getElementById('particles-canvas');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId = null;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                initParticles();
            }, 200);
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 22000), 60);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    /* --- 3. Custom Mouse Cursor --- */
    const cursorDot = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursorDot && cursorFollower && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;

            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        });
    }

    /* --- 4. Scroll Progress & Sticky Header & Back to Top --- */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- 5. Theme Switcher (Dark/Light) --- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.replace('dark-theme', 'light-theme');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.replace('light-theme', 'dark-theme');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    /* --- 6. Mobile Menu Toggle --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-xmark';
                mobileToggle.setAttribute('aria-expanded', 'true');
            } else {
                icon.className = 'fas fa-bars';
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (mobileToggle.querySelector('i')) {
                    mobileToggle.querySelector('i').className = 'fas fa-bars';
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    /* --- 7. COUNTRY / MARKET DYNAMIC ADAPTER SWITCHER --- */
    const countrySelect = document.getElementById('country-select');
    const marketStatusMsg = document.getElementById('market-status-msg');
    const heroSubTitle = document.getElementById('hero-sub-title');
    const heroBioText = document.getElementById('hero-bio-text');
    const relocationDesc = document.getElementById('relocation-text-desc');

    if (countrySelect) {
        countrySelect.addEventListener('change', (e) => {
            const market = e.target.value;

            // Remove previous market classes
            document.body.classList.remove('market-global', 'market-ksa', 'market-pak', 'market-can', 'market-usa');
            document.body.classList.add(`market-${market}`);

            if (market === 'ksa') {
                if (marketStatusMsg) marketStatusMsg.innerHTML = '<i class="fas fa-flag"></i> Saudi Arabia (KSA / Aramco Market Mode Active) — Transferable Iqama #2566684850';
                if (heroSubTitle) heroSubTitle.textContent = 'Expert Land Surveyor — Aramco & SEC Power Transmission Lines (KSA)';
                if (heroBioText) heroBioText.textContent = 'With 12+ years experience across KSA & Pakistan, Engr. Zulfiqar Rabbani specializes in Saudi Aramco & SEC standards for 34.5KV & 132KV OHTL transmission lines, Total Station calibrations, and Trimble GPS RTK.';
                if (relocationDesc) relocationDesc.innerHTML = 'Currently located in <strong>Abqaiq, Dammam, KSA</strong> with transferable Iqama No: 2566684850. Available for immediate local mobilization across Neom, Riyadh, Jubail & Eastern Province.';
            } else if (market === 'pak') {
                if (marketStatusMsg) marketStatusMsg.innerHTML = '<i class="fas fa-flag-checkered"></i> Pakistan (Islamabad / MES / CWO Market Mode Active)';
                if (heroSubTitle) heroSubTitle.textContent = 'Senior Land Surveyor & Associate Civil Engineer — High-Rise Buildings & Government Infrastructure';
                if (heroBioText) heroBioText.textContent = 'Engr. Zulfiqar Rabbani has extensive experience in Islamabad & nationwide infrastructure projects including Centaurus Mall Movenpick Hotel, 100m Underground Naval Firing Range, and Military Engineering Services (MES) contracts.';
                if (relocationDesc) relocationDesc.innerHTML = 'Permanent residence in <strong>Sector H-9, Islamabad, Pakistan</strong>. Available for senior consultancy and project management across Pakistan.';
            } else if (market === 'can') {
                if (marketStatusMsg) marketStatusMsg.innerHTML = '<i class="fas fa-passport"></i> Canada Market Mode Active — Overseas Employment & Relocation Ready (CAD)';
                if (heroSubTitle) heroSubTitle.textContent = 'Senior Geomatic & Civil Land Surveyor — Ready for Canadian Infrastructure Projects';
                if (heroBioText) heroBioText.textContent = 'Qualified Associate Civil Engineer Engr. Zulfiqar Rabbani has 12+ years total station & GPS experience, fully aligned for Canadian geomatics standards, pipeline surveying, and structural civil projects.';
                if (relocationDesc) relocationDesc.innerHTML = 'Fully ready for <strong>Canadian Overseas Sponsorship & LMIA / Work Permit relocation</strong> for civil surveying and infrastructure roles in Ontario, Alberta, BC & nationwide.';
            } else if (market === 'usa') {
                if (marketStatusMsg) marketStatusMsg.innerHTML = '<i class="fas fa-bolt"></i> USA Market Mode Active — High-Voltage Powerline & Heavy Civil Qualified (USD)';
                if (heroSubTitle) heroSubTitle.textContent = 'Lead Powerline & Topographic Land Surveyor — US OHTL & Substation Specialist';
                if (heroBioText) heroBioText.textContent = '12+ years track record executing high-voltage overhead transmission lines, Horizontal Directional Drilling (HDD), stub angle setting, and Trimble GPS RTK surveying.';
                if (relocationDesc) relocationDesc.innerHTML = 'Available for <strong>US H-1B / International Contractor recruitment</strong> in high-voltage power transmission, solar renewable energy grid connections, and heavy civil infrastructure.';
            } else {
                // Global default
                if (marketStatusMsg) marketStatusMsg.innerHTML = '<i class="fas fa-globe"></i> International Mode Active — Ready for Global Mobilization (KSA, PAK, Canada, USA)';
                if (heroSubTitle) heroSubTitle.textContent = 'Expert in Land Surveying, OHTL Powerlines & Infrastructure (Global & Overseas)';
                if (heroBioText) heroBioText.textContent = 'With over 12 years of diverse experience in Land Surveying across Saudi Arabia (KSA) and Pakistan, Engr. Zulfiqar Rabbani specializes in Total Station (Leica, Sokkia, Topcon, Nikon), Trimble GPS, 34.5KV & 132KV OHTL Powerlines, Underground Cables, Solar Plants, and Aramco/SEC Standards compliance.';
                if (relocationDesc) relocationDesc.innerHTML = 'Seeking new job positions in <strong>Saudi Arabia (Abqaiq, Dammam, Jubail, Riyadh, Neom) & GCC / International Markets (Canada, USA, Europe)</strong> with immediate mobilization.';
            }
        });
    }

    /* --- 8. Animated Typing Effect --- */
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            "Engr. Zulfiqar Rabbani — Associate Civil Engineer",
            "Senior Land Surveyor with 12+ Years Field Experience",
            "Total Station (Leica, Sokkia, Topcon, Nikon)",
            "Trimble GPS Systems & Precision Auto Levels",
            "34.5KV & 132KV OHTL Powerlines & Solar Plants",
            "ARAMCO & SEC Surveying Standards Specialist"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2200; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400; // Pause before typing next
            }

            setTimeout(typeLoop, typeSpeed);
        }
        typeLoop();
    }

    /* --- 9. Work Experience Region Tabs Switcher --- */
    const expTabBtns = document.querySelectorAll('[data-exp-tab]');
    const expItems = document.querySelectorAll('.exp-item');

    expTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-exp-tab');

            expTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            expItems.forEach(item => {
                if (targetTab === 'all-exp') {
                    item.style.display = 'block';
                } else if (item.classList.contains(targetTab)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* --- 10. Project Category Filter Buttons --- */
    const projFilterBtns = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');

    projFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            projFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                } else if (category && category.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* --- 11. INTERACTIVE HERO STAT CARDS & POPUP MODALS --- */
    function openCustomModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCustomModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    function closeAllModals() {
        document.querySelectorAll('.custom-modal-overlay, .cv-modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }

    // Escape key listener for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Stat Cards Event Handlers
    const btnStatExp = document.getElementById('btn-stat-exp');
    if (btnStatExp) btnStatExp.addEventListener('click', () => openCustomModal('modal-exp-detail'));

    const btnStatTrack = document.getElementById('btn-stat-track');
    if (btnStatTrack) btnStatTrack.addEventListener('click', () => openCustomModal('modal-track-detail'));

    const btnStatProjects = document.getElementById('btn-stat-projects');
    if (btnStatProjects) btnStatProjects.addEventListener('click', () => openCustomModal('modal-projects-detail'));

    const btnStatStandards = document.getElementById('btn-stat-standards');
    if (btnStatStandards) btnStatStandards.addEventListener('click', () => openCustomModal('modal-standards-detail'));

    // Generic Close Button Handlers
    document.querySelectorAll('[data-close-modal]').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modalId = closeBtn.getAttribute('data-close-modal');
            closeCustomModal(modalId);
        });
    });

    // Backdrop Click Handlers
    document.querySelectorAll('.custom-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    /* --- 12. Intersection Observer for Scroll Reveal --- */
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .inst-card, .edu-card, .timeline-item, .project-card, .faq-item').forEach(el => {
        revealObserver.observe(el);
    });

    /* --- 13. Active Scrollspy for Navigation Links --- */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    /* --- 14. FAQ Accordion Handler (AEO) --- */
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Close other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherBtn = item.querySelector('.faq-question');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            faqItem.classList.toggle('active');
            button.setAttribute('aria-expanded', (!isExpanded).toString());
        });
    });

    /* --- 15. Printable / Interactive CV Modal Controls --- */
    const cvModal = document.getElementById('cv-modal');
    const cvModalClose = document.getElementById('cv-modal-close');

    function openCvModal(e) {
        if (e) e.preventDefault();
        if (cvModal) {
            cvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCvModal() {
        if (cvModal) {
            cvModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Bind modal trigger specifically to elements with [data-trigger-cv-modal]
    document.querySelectorAll('[data-trigger-cv-modal]').forEach(trigger => {
        trigger.addEventListener('click', openCvModal);
    });

    if (cvModalClose) cvModalClose.addEventListener('click', closeCvModal);

    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) closeCvModal();
        });
    }

    /* --- 16. Contact Form Handler (Direct WhatsApp Inquiry KSA) --- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('caller-name');
            const phoneInput = document.getElementById('caller-phone');
            const messageInput = document.getElementById('caller-message');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !phone || !message) {
                alert('Please complete all fields before sending your inquiry.');
                return;
            }

            const text = `Hello Engr. Zulfiqar Rabbani,%0A%0AMy Name / Organization: ${encodeURIComponent(name)}%0APhone/WhatsApp: ${encodeURIComponent(phone)}%0AInquiry / Requirement: ${encodeURIComponent(message)}`;
            
            // Open WhatsApp KSA (+966598172678)
            window.open(`https://wa.me/966598172678?text=${text}`, '_blank');
        });
    }

});
