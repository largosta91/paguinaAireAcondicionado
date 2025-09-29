//menu desplegable del nav cuando este se hace para movil o su ventana se achica 
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

//este es un bloque donde esta la logica de mi carrousell de marcas 
// carousel
const carousel = document.getElementById('carousel');
const totalItems = carousel.children.length / 2; // sólo contamos los originales
const itemWidth = carousel.children[0].offsetWidth + 32; 
let index = 0;

function moveCarousel() {
  index++;
  carousel.style.transition = 'transform 0.5s linear';
  carousel.style.transform = `translateX(-${index * itemWidth}px)`;

  // Reset para loop
  if (index >= totalItems) {
    setTimeout(() => {
      carousel.style.transition = 'none';
      carousel.style.transform = `translateX(0)`;
      index = 0;
    }, 500); // coincide con la duración de la transición
  }
}

// Avanza automáticamente cada 3 segundos
setInterval(moveCarousel, 3000);

const form = document.getElementById('calcForm');
  const resultado = document.getElementById('resultado');
  const areaSpan = document.getElementById('area');
  const recomendacion = document.getElementById('recomendacion');

  // logica del calculador 

  form.addEventListener('submit', e => {
    e.preventDefault();
    const ancho = parseFloat(document.getElementById('ancho').value);
    const largo = parseFloat(document.getElementById('largo').value);
    if (isNaN(ancho) || isNaN(largo)) return;

    const area = (ancho * largo).toFixed(2);
    areaSpan.textContent = area;

    let imgSrc = '';
    if (area < 20) {
      imgSrc = 'https://via.placeholder.com/200x150?text=Producto+Pequeño';
    } else if (area <= 50) {
      imgSrc = 'https://via.placeholder.com/200x150?text=Producto+Mediano';
    } else {
      imgSrc = 'https://via.placeholder.com/200x150?text=Producto+Grande';
    }

    recomendacion.innerHTML = `<img src="${imgSrc}" alt="Producto recomendado" class="mx-auto rounded-lg shadow-md mt-2">`;
    resultado.classList.remove('hidden');
  });
