// main.js

// Nota: El código 'document.getElementById('year').textContent...' NO debe ir dentro de DOMContentLoaded
// si colocaste el script antes de </body>, ya que el elemento 'year' ya estará cargado.

document.addEventListener('DOMContentLoaded', () => {

    // === 1. MENÚ MÓVIL ===
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            // SOLUCIÓN: Solo alternar 'hidden' para controlar la visibilidad.
            mobileMenu.classList.toggle('hidden');
        });

        // Cierra el menú cuando se selecciona un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Cierra el menú después de navegar
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // === 2. CARRUSEL DE LOGOS ===
    const carousel = document.getElementById('carousel');
    const template = document.getElementById('logos')?.content;

    if (carousel && template) {
        carousel.appendChild(template.cloneNode(true));
        carousel.appendChild(template.cloneNode(true));

        const itemWidth = carousel.children[0].offsetWidth + 64;
        let index = 0;

        function moveCarousel() {
            index++;
            carousel.style.transition = 'transform 0.5s linear';
            carousel.style.transform = `translateX(-${index * itemWidth}px)`;

            const totalItems = carousel.children.length / 2;
            if (index >= totalItems) {
                setTimeout(() => {
                    carousel.style.transition = 'none';
                    carousel.style.transform = 'translateX(0)';
                    index = 0;
                }, 500);
            }
        }
        setInterval(moveCarousel, 1500);
    }

    // === 3. CALCULADORA DE METROS CUADRADOS ===
    document.getElementById('calcForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const ancho = parseFloat(document.getElementById('ancho').value);
        const largo = parseFloat(document.getElementById('largo').value);
        
        // 1. Cálculo del área y capacidad
        const area = ancho * largo;
        // Se usa un factor de 120 Frig/m² como estándar base
        let frigoriasNecesarias = Math.ceil(area * 120 / 100) * 100; // Redondea al múltiplo de 100 superior

        let recomendacionTexto = '';
        let recomendacionClase = 'text-gray-800'; // Color por defecto

        // 2. Lógica para la recomendación textual
        if (area > 40) {
            recomendacionTexto = `<p>Para un área de ${area.toFixed(1)} m² necesitarías un equipo de **${frigoriasNecesarias} Frigorías** o superior.</p>
                                    <p class="mt-2 text-blue-800 font-semibold">Conseguimos lo que buscás. Escribinos y vemos opciones.</p>`; 
            recomendacionClase = 'text-blue-900';
        } else if (area >= 26) {
            recomendacionTexto = `<p>Para un área de ${area.toFixed(1)} m², necesitas un equipo de aproximadamente **${frigoriasNecesarias} Frigorías**.</p>
                                    <p class="mt-2 font-semibold text-blue-700">Te sugerimos un Split Inverter de Alta Capacidad (4500 a 5500 Fg) para máxima eficiencia.</p>`;
        } else if (area >= 16) {
            recomendacionTexto = `<p>Para un área de ${area.toFixed(1)} m², necesitas un equipo de aproximadamente **${frigoriasNecesarias} Frigorías**.</p>
                                    <p class="mt-2 font-semibold text-blue-700">El **Split Inverter 3500-4500 Fg** es ideal para ahorrar hasta un 40% de energía.</p>`;
        } else if (area > 0) {
            recomendacionTexto = `<p>Para un área de ${area.toFixed(1)} m², un equipo de **${frigoriasNecesarias} Frigorías** (o el Portátil) será suficiente.</p>`;
        } else {
            recomendacionTexto = `<p class="text-red-500">Por favor, introduce medidas válidas.</p>`;
        }
        
        // 3. Mostrar el resultado
        document.getElementById('area').textContent = area.toFixed(1);
        document.getElementById('recomendacion').innerHTML = recomendacionTexto;
        document.getElementById('resultado').classList.remove('hidden');
        document.getElementById('recomendacion').className = `mt-4 ${recomendacionClase}`;
    });

}); // CIERRE DEL DOMContentLoaded

// === 4. MODIFICAR AÑO DE PÁGINA (FUERA de DOMContentLoaded para asegurar que corre si el script está al final) ===
document.getElementById('year').textContent = new Date().getFullYear();




