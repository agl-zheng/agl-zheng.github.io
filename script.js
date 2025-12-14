document.addEventListener('DOMContentLoaded', () => {
    // Gestion de l'effet de défilement de la barre de navigation
    const navbar = document.getElementById('navbar');
    const scrollHandler = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Écoute l'événement de défilement
    window.addEventListener('scroll', scrollHandler);

    // Initialise la classe au chargement si l'utilisateur n'est pas en haut
    scrollHandler();

    // Gestion du défilement fluide pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            const navbarHeight = 64; // Hauteur de la barre de navigation pour l'offset

            if (target) {
                // Calcule la position de défilement en soustrayant la hauteur de la barre de navigation
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Si la cible est l'accueil, on s'assure d'aller en haut (0)
                if (targetId === '#accueil') {
                     window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});