document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('main-header');
    const sectionsToAnimate = document.querySelectorAll('.section-hidden');

    const scrollAmount = 350;
    const headerHeight = header.offsetHeight;
    let lastScrollTop = 0;


    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > headerHeight) { 
            header.style.transform = 'translateY(-100%)';
        } 
        else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = Math.max(0, currentScroll);
    });

    /**
     * Fait défiler le conteneur des projets dans une direction
     * @param {number} direction - 1 pour droite, -1 pour gauche
     */
    const scrollProjects = (direction) => {
        const newScrollLeft = projectsContainer.scrollLeft + (direction * scrollAmount);
        
        projectsContainer.scroll({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    };

    if (scrollLeftBtn && projectsContainer) {
        scrollLeftBtn.addEventListener('click', () => scrollProjects(-1));
    }

    if (scrollRightBtn && projectsContainer) {
        scrollRightBtn.addEventListener('click', () => scrollProjects(1));
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetId = link.getAttribute('href'); 
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 64; 
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.classList.remove('section-hidden');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });
});