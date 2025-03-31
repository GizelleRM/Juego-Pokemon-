// Zonas objetivo con coordenadas en % del mapa
const zonasObjetivo = {
    1: { left: 2.2, top: 60 },
    2: { left: 14, top: 60 },
    3: { left: 16.25, top: 40 },
    4: { left: 22, top: 53 },
    5: { left: 38.5, top: 53 },
    6: { left: 22, top: 25.5 },
    7: { left: 36.1, top: 36.3 },
    8: { left: 25.5, top: 3.7 },
    9: { left: 36.1, top: 3.7 },
    10: { left: 54.7, top: 36.3 },
    11: { left: 62, top: 5.4 }
};

document.addEventListener("DOMContentLoaded", () => {
    const mapa = document.getElementById("mapa");
    if (!mapa) return;

    let nivelActual = parseInt(mapa.dataset.nivel) || 0;

    // Mover al avatar directamente al nivel guardado
    moverAvatarAZona(nivelActual);

    // Crear zonas clicables
    Object.entries(zonasObjetivo).forEach(([nivelStr, coords]) => {
        const nivel = parseInt(nivelStr);
        const zona = document.createElement('div');
        zona.classList.add('zona-clic');
        zona.dataset.nivel = nivel;
        zona.style.left = coords.left + '%';
        zona.style.top = coords.top + '%';
        zona.style.width = '6%';
        zona.style.height = '9%';
        zona.style.position = 'absolute';
        zona.style.cursor = 'pointer';
        zona.style.transition = 'background-color 0.3s';
        // Colorear según avance
        if (nivel < nivelActual) {
            zona.style.backgroundColor = 'rgba(0, 200, 0, 0.23)'; // verde: completado
        } else if (nivel <= nivelActual  ) {
            zona.style.backgroundColor = 'rgba(255, 255, 0, 0.26)'; // amarillo: disponible
        } else {
            zona.style.backgroundColor = 'rgba(100, 100, 100, 0.11)'; // gris: bloqueado
        }

        // Escuchar clics solo si está permitido
        zona.addEventListener('click', () => {
            if (nivel <= nivelActual) {
                moverAvatarAZona(nivel);
                nivelActual = nivel;

                if (aplicacionesPorNivel[nivel]) {
                    setTimeout(() => {
                        window.location.href = aplicacionesPorNivel[nivel];
                    }, 500);
                }
            } else {
                alert("Primero debes completar el nivel " + (nivelActual));
            }
        });

        mapa.appendChild(zona);
    });

    // Función que mueve avatar y pokémon
    function moverAvatarAZona(nivel) {
        const objetivo = zonasObjetivo[nivel];
        const separacionX = 2;
        const separacionY = 3;

        const avatar = document.getElementById("avatar");
        const pokemon = document.getElementById("pokemon");

        if (!avatar || !pokemon) return;

        avatar.style.left = (objetivo.left - 1) + "%";
        avatar.style.top = (objetivo.top - 3) + "%";

        pokemon.style.left = (objetivo.left + separacionX) + "%";
        pokemon.style.top = (objetivo.top + separacionY - 1.5) + "%";
    }
});