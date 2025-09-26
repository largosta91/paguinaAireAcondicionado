const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

// Script para el efecto de scroll
const navBar = document.getElementById('main-nav');
const targetSection = document.getElementById('porque-elegirnos');

if (navBar && targetSection) {
    window.addEventListener('scroll', () => {
        const sectionTop = targetSection.getBoundingClientRect().top;
        const threshold = navBar.offsetHeight;

        // Si la sección "por qué elegirnos" llega arriba de la barra de navegación
        if (sectionTop <= threshold) {
            // Añade la clase de color blanco sólido
            navBar.classList.add('bg-white');
            // Y elimina la de color transparente
            navBar.classList.remove('bg-white/30');
        } else {
            // Si no, la hace transparente de nuevo
            navBar.classList.add('bg-white/30');
            navBar.classList.remove('bg-white');
        }
    });
}