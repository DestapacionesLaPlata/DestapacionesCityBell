// Datos de los servicios
const servicesData = {
    cocinas: {
        title: "Destapación de Cocinas",
        icon: "fas fa-sink",
        description: "Destapación especializada de cocinas, desobstrucción y destapaciones de caños de desagüe de cocinas y lavaderos. Solucionamos problemas de rejillas en cocinas, patios y lavaderos con tecnología moderna y equipos especializados.",
        features: [
            "Destapación completa de cañerías de cocina",
            "Limpieza de rejillas y desagües",
            "Eliminación de obstrucciones por grasa y residuos",
            "Servicio garantizado y con resultados inmediatos",
            "Uso de máquinas profesionales de alta presión"
        ],
        whatsappMessage: "Hola, estoy interesado en el servicio de Destapación de Cocinas. ¿Podrían brindarme más información?",
        images: [
            "imaged/Destapacion_Cocina.jpg",
            "imaged/Destapacion_Cocina2.jpg"
        ]
    },
    canerias: {
        title: "Destapación de Cañerías",
        icon: "fas fa-wrench", // <- clase FA coherente con las demás
        description: "Destapación de cañerías de distribución de agua con oxígeno aire comprimido regulado. Destapación de columnas de desagüe de cocinas, lavaderos y baños. Solucionamos problemas complejos en hogares y empresas.",
        features: [
            "Destapación con aire comprimido regulado",
            "Limpieza de columnas de desagüe",
            "Eliminación de raíces y sedimentos",
            "Tecnología moderna y no invasiva",
            "Soluciones permanentes y garantizadas"
        ],
        whatsappMessage: "Hola, estoy interesado en el servicio de Destapación de Cañerías. ¿Podrían brindarme más información?",
        images: [
            "imaged/Cambio_Caño.jpg",
            "imaged/Cambio_Caño2.jpg",
            "imaged/Cambios_Caño3.jpg"
        ]
    },
    baños: {
        title: "Destapación de Baños",
        icon: "fas fa-toilet",
        description: "Destapaciones de baños e inodoros de baños, caños de desagüe de piletas del baño, lavamanos, bidets, bañeras y bañaderas. Servicio rápido y eficiente para resolver emergencias en baños.",
        features: [
            "Destapación de inodoros y sanitarios",
            "Limpieza de lavamanos y bidets",
            "Desobstrucción de bañeras y duchas",
            "Servicio de emergencia disponible",
            "Resultados inmediatos y garantizados"
        ],
        whatsappMessage: "Hola, estoy interesado en el servicio de Destapación de Baños. ¿Podrían brindarme más información?",
        images: [
            "imaged/Destapacion_Baño.jpg",
            "imaged/Destapacion_Baño2.jpg"
        ]
    },
    cloacas: {
        title: "Destapación de Cloacas",
        icon: "fas fa-water",
        description: "Realizamos destapaciones de cloacas, caños cloacales (desde inodoro hasta cloaca o de cámara cloacal a inodoro), cámaras de cloacas y columnas cloacales internas. Solucionamos problemas complejos del sistema cloacal.",
        features: [
            "Destapación completa de sistemas cloacales",
            "Limpieza de cámaras sépticas",
            "Eliminación de obstrucciones sólidas",
            "Tecnología de punta para diagnósticos precisos",
            "Servicio para hogares y grandes edificios"
        ],
        whatsappMessage: "Hola, estoy interesado en el servicio de Destapación de Cloacas. ¿Podrían brindarme más información?",
        images: [
            "imaged/Destapacion.jpg",
            "imaged/Destapacion2.jpg"
        ]
    },
    limpieza: {
        title: "Limpieza de Cañerías",
        icon: "fas fa-wind",
        description: "Realizamos limpieza, desobstrucción y cepillado de cañerías y columnas de agua, eliminación de obstrucciones en cañerías pluviales como barro, material, trapos, cemento, bolsas, pañales y elementos sólidos.",
        features: [
            "Limpieza profunda de cañerías",
            "Eliminación de sedimentos y residuos",
            "Cepillado especializado de tuberías",
            "Mantenimiento preventivo",
            "Tecnología de alta presión"
        ],
        whatsappMessage: "Hola, estoy interesado en el servicio de Limpieza de Cañerías. ¿Podrían brindarme más información?",
        images: [
            "imaged/Limpieza.jpg",
            "imaged/Limpieza2.jpg",
            "imaged/Limpieza3.jpg"
        ]
    },
    cambios: {
        title: "Cambio de Caños",
        icon: "fas fa-tools",
        description: "Contamos con equipo de obra para el cambio de caños en general. Realizamos instalaciones de cámaras sépticas, bio-digestores, trampas de grasa para cocinas. Servicios completos de instalación y mantenimiento.",
        features: [
            "Cambio completo de sistemas de cañerías",
            "Instalación de cámaras sépticas",
            "Montaje de bio-digestores",
            "Trampas de grasa para cocinas industriales",
            "Servicios para hogares y empresas"
        ],
        whatsappMessage: "Hola, estoy interesado en el servicio de Cambio de Caños. ¿Podrían brindarme más información?",
        images: [
            "imaged/Cambio_Caño2.jpg",
            "imaged/Cambios_Caño3.jpg",
            "imaged/Cambio_Caño.jpg"
        ]
    }
};

// Generar modales dinámicamente
function generateModals() {
    const modalsContainer = document.getElementById('modals-container');
    if (!modalsContainer) return;

    // crear mapa claveNormalizada -> claveOriginal para resolver títulos con tildes/ñ/espacios
    const keyMap = {};
    Object.keys(servicesData).forEach(k => {
        keyMap[normalizeKey(k)] = k;
    });

    // Asegurar que cada .service-card muestre su icono (usa keyMap para buscar correctamente)
    document.querySelectorAll('.service-card').forEach(card => {
        if (card.querySelector('.service-icon')) return; // ya tiene icono

        const raw = card.getAttribute('data-service') || (card.querySelector('h3')?.textContent || '');
        const normalized = normalizeKey(raw);
        const originalKey = keyMap[normalized];
        const svc = originalKey ? servicesData[originalKey] : null;

        let iconHTML = '';
        if (svc && svc.icon) {
            if (typeof svc.icon === 'string' && (svc.icon.includes('/') || svc.icon.includes('.'))) {
                iconHTML = `<img src="${svc.icon}" alt="${svc.title} icon" onerror="this.onerror=null;this.style.display='none';">`;
            } else {
                iconHTML = `<i class="${svc.icon}"></i>`;
            }
        } else {
            iconHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#FFFBE6"/><path d="M7 12h10" stroke="#CED929" stroke-width="2" stroke-linecap="round"/></svg>`;
        }

        const div = document.createElement('div');
        div.className = 'service-icon';
        div.innerHTML = iconHTML;
        card.prepend(div);
    });

    modalsContainer.innerHTML = ''; // limpiar antes de generar

    // generar modales usando la clave normalizada como sufijo de id (consistente con la búsqueda)
    Object.keys(keyMap).forEach(normKey => {
        const originalKey = keyMap[normKey];
        const serviceData = servicesData[originalKey];
        const idSuffix = normKey; // clave normalizada (sin tildes/ñ/espacios)

        // images
        const imgs = Array.isArray(serviceData.images) && serviceData.images.length
            ? serviceData.images
            : [`https://via.placeholder.com/600x400?text=${encodeURIComponent(serviceData.title)}`];

        const imagesHTML = imgs.map((src, idx) => `
            <div class="carousel-item">
                <img src="${src}" alt="${serviceData.title} ${idx + 1}"
                     onerror="this.onerror=null;this.src='https://via.placeholder.com/600x400?text=Sin+imagen';">
            </div>
        `).join('');

        const indicatorsHTML = imgs.map((_, idx) =>
            `<div class="indicator ${idx === 0 ? 'active' : ''}" data-slide="${idx}"></div>`
        ).join('');

        // icono del modal: permitir ruta o clase (y fallback SVG)
        let modalIconHTML = '';
        if (serviceData.icon) {
            if (typeof serviceData.icon === 'string' && (serviceData.icon.includes('/') || serviceData.icon.includes('.'))) {
                modalIconHTML = `<img src="${serviceData.icon}" alt="${serviceData.title} icon" onerror="this.onerror=null;this.style.display='none';">`;
            } else {
                modalIconHTML = `<i class="${serviceData.icon}"></i>`;
            }
        } else {
            modalIconHTML = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#FFFBE6"/><path d="M7 12h10" stroke="#CED929" stroke-width="2" stroke-linecap="round"/></svg>`;
        }

        const modalHTML = `
            <div id="modal${idSuffix}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="service-icon-modal">
                            ${modalIconHTML}
                        </div>
                        <h2>${serviceData.title}</h2>
                        <button class="close-modal" data-service="${idSuffix}">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="service-images">
                            <div class="carousel">
                                <div class="carousel-inner" id="carousel${idSuffix}">
                                    ${imagesHTML}
                                </div>
                                <button class="carousel-control prev" data-service="${idSuffix}">&#10094;</button>
                                <button class="carousel-control next" data-service="${idSuffix}">&#10095;</button>
                            </div>
                            <div class="carousel-indicators" id="indicators${idSuffix}">
                                ${indicatorsHTML}
                            </div>
                        </div>
                        <div class="service-details">
                            <h3>Servicio Profesional</h3>
                            <div class="service-description">
                                <p>${serviceData.description}</p>
                            </div>
                            <div class="service-features">
                                <h4>Características del Servicio:</h4>
                                <ul>
                                    ${serviceData.features.map(f => `<li>${f}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="modal-actions">
                                <a href="https://wa.me/542215060986?text=${encodeURIComponent(serviceData.whatsappMessage)}" class="btn-whatsapp-modal">
                                    <i class="fab fa-whatsapp"></i> Solicitar este Servicio
                                </a>
                                <button class="btn-close-modal" data-service="${idSuffix}">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        modalsContainer.innerHTML += modalHTML;
    });
}

// Funcionalidad de modales
function openModal(service) {
    const modal = document.getElementById(`modal${service}`);  // ← Sin capitalize
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        initCarousel(service);
    }
}

function closeModal(service) {
    const modal = document.getElementById(`modal${service}`);  // ← Sin capitalize
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function normalizeKey(s) {
    return String(s || '')
        .trim()
        .toLowerCase()
        .replace(/[ñÑ]/g, 'n')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
        .replace(/\s+/g, '') // elimina espacios
        .replace(/[^a-z0-9]/g, ''); // deja solo alfanum
}

function initCarousel(service) {
    const carousel = document.getElementById(`carousel${service}`);
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.getElementById(`indicators${service}`);

    // asegurarse de que los items estén en fila y tengan ancho 100%
    carousel.style.display = 'flex';
    carousel.style.transition = 'transform 0.4s ease';

    items.forEach(item => {
        item.style.minWidth = '100%';
        item.style.boxSizing = 'border-box';
    });

    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
        items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-slide', index);
            indicator.onclick = () => goToSlide(service, index);
            indicatorsContainer.appendChild(indicator);
        });
    }

    carousel.dataset.currentSlide = '0';
    updateCarousel(service);
}

function updateCarousel(service) {
    const carousel = document.getElementById(`carousel${service}`);
    if (!carousel) return;

    const currentSlide = parseInt(carousel.dataset.currentSlide || '0');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    const indicators = document.querySelectorAll(`#indicators${service} .indicator`);
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide(service) {
    const carousel = document.getElementById(`carousel${service}`);
    if (!carousel) return;
    const items = carousel.querySelectorAll('.carousel-item');
    let currentSlide = parseInt(carousel.dataset.currentSlide || '0');
    currentSlide = (currentSlide + 1) % items.length;
    carousel.dataset.currentSlide = currentSlide;
    updateCarousel(service);
}

function prevSlide(service) {
    const carousel = document.getElementById(`carousel${service}`);
    if (!carousel) return;
    const items = carousel.querySelectorAll('.carousel-item');
    let currentSlide = parseInt(carousel.dataset.currentSlide || '0');
    currentSlide = (currentSlide - 1 + items.length) % items.length;
    carousel.dataset.currentSlide = currentSlide;
    updateCarousel(service);
}

function goToSlide(service, slideIndex) {
    const carousel = document.getElementById(`carousel${service}`);
    if (!carousel) return;
    carousel.dataset.currentSlide = slideIndex;
    updateCarousel(service);
}

// Helper: intenta obtener servicio actual a partir de un elemento dentro del modal
function getOpenServiceFromElement(el) {
    const modalEl = el.closest('.modal');
    if (!modalEl || !modalEl.id) return null;
    return modalEl.id.replace('modal', '').toLowerCase();
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    generateModals();

    // delegación: abrir modal al click en una .service-card (más robusto)
    document.body.addEventListener('click', function(e) {
        const card = e.target.closest('.service-card');
        if (!card) return;
        const raw = card.getAttribute('data-service') || '';
        const service = normalizeKey(raw);
        if (servicesData[service]) {
            openModal(service);
        } else {
            console.warn('Servicio no encontrado (data-service mismatch):', raw, '=>', service);
        }
    });

    // Manejo global de clicks para controles del modal
    document.addEventListener('click', function(event) {
        // Cerrar si clic fuera del modal-content (fondo)
        if (event.target.classList && event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
            return;
        }

        // Botones cerrar (tienen data-service) o botón genérico de cerrar
        if (event.target.matches('.close-modal, .btn-close-modal')) {
            const service = event.target.getAttribute('data-service') || getOpenServiceFromElement(event.target);
            if (service) closeModal(service);
            return;
        }

        // Controles de carrusel (prev / next)
        if (event.target.matches('.carousel-control.next') || event.target.closest('.carousel-control.next')) {
            const ctrl = event.target.matches('.carousel-control.next') ? event.target : event.target.closest('.carousel-control.next');
            const service = ctrl.getAttribute('data-service') || getOpenServiceFromElement(ctrl);
            if (service) nextSlide(service);
            return;
        }
        if (event.target.matches('.carousel-control.prev') || event.target.closest('.carousel-control.prev')) {
            const ctrl = event.target.matches('.carousel-control.prev') ? event.target : event.target.closest('.carousel-control.prev');
            const service = ctrl.getAttribute('data-service') || getOpenServiceFromElement(ctrl);
            if (service) prevSlide(service);
            return;
        }

        // Indicadores
        if (event.target.matches('.indicator')) {
            const parentId = event.target.parentElement.id; // e.g. indicatorsCocinas
            const service = parentId.replace('indicators', '').toLowerCase();
            const idx = parseInt(event.target.getAttribute('data-slide'));
            if (!isNaN(idx)) goToSlide(service, idx);
            return;
        }
    });

    // Listener de teclado para cambiar slides cuando un modal está abierto
    document.addEventListener('keydown', function(e) {
        const openModal = Array.from(document.querySelectorAll('.modal')).find(m => m.style.display === 'block');
        if (!openModal) return; // no hay modal abierto

        const service = openModal.id.replace('modal', '').toLowerCase(); // modalCocinas -> cocinas
        if (!service) return;

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide(service);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide(service);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeModal(service);
        }
    });

    // Inicializar todos los carousels existentes
    Object.keys(servicesData).forEach(service => initCarousel(service));
});