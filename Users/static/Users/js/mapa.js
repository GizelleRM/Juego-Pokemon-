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
    10: { left: 54.7, top: 36.3 }
};

let nivelActual = 0;

document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById('mapa')) return;

    // Crear zonas clicables
    Object.entries(zonasObjetivo).forEach(([nivel, coords]) => {
        const zona = document.createElement('div');
        zona.classList.add('zona-clic');
        zona.dataset.nivel = nivel;
        zona.style.left = coords.left + '%';
        zona.style.top = coords.top + '%';
        zona.style.width = '6%';
        zona.style.height = '9%';
        zona.style.position = 'absolute';
        zona.style.cursor = 'pointer';
        zona.style.backgroundColor = 'rgba(0, 255, 0, 0)'; // visible por ahora
        document.getElementById('mapa').appendChild(zona);
        //
    });

    // Escuchar clics
    document.querySelectorAll('.zona-clic').forEach(zona => {
        zona.addEventListener('click', () => {
            const nivel = parseInt(zona.dataset.nivel);

            if (nivel === 1 || nivel === nivelActual + 1) {
                moverAvatarAZona(nivel);
                nivelActual = nivel;
            } else {
                alert("Primero debes completar el nivel " + (nivelActual + 1));
            }
        });
    });

    // Función que mueve avatar y pokémon
    function moverAvatarAZona(nivel) {
        const objetivo = zonasObjetivo[nivel];
        const separacionX = 2;
        const separacionY = 3;

        const avatar = document.getElementById("avatar");
        const pokemon = document.getElementById("pokemon");

        avatar.style.left = (objetivo.left-1) + "%";
        avatar.style.top = (objetivo.top-3 )+ "%";

        pokemon.style.left = (objetivo.left + separacionX) + "%";
        pokemon.style.top = (objetivo.top + separacionY-1.5) + "%";
    }
});
