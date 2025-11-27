//ejercicio: consumo de APIs con fetch
// objetivo
//crea una funcion llamado obtenerpokemoApi que reciba  un numbre  de pokemon, consulte la pokeapi y devuelva  los datos  en JSON e imprima la consola 


async function obtenerpokemoApi(busqueda) {
    if (busqueda === undefined || busqueda === null || busqueda === '') {
        throw new Error('Se requiere un nombre o número de pokémon');
    }
    
    const url = `https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`;
    
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Pokémon no encontrado`);
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('obtenerpokemoApi error:', err);
        throw err;
    }
}

// Función para buscar Pokémon
async function buscarPokemon() {
    const input = document.getElementById('pokemonInput');
    const appDiv = document.getElementById('app');
    const busqueda = input.value.trim();

    if (!busqueda) {
        appDiv.innerHTML = '<div class="error-message">Por favor ingresa un nombre o ID de Pokémon</div>';
        return;
    }

    appDiv.innerHTML = '<div class="loading">Buscando Pokémon...</div>';

    try {
        const pokemon = await obtenerpokemoApi(busqueda);
        mostrarTarjetaPokemon(pokemon);
    } catch (error) {
        appDiv.innerHTML = `<div class="error-message">❌ ${error.message}</div>`;
    }
}

// Función para mostrar la tarjeta del Pokémon
function mostrarTarjetaPokemon(pokemon) {
    const appDiv = document.getElementById('app');
    
    // Obtener tipos
    const tipos = pokemon.types.map(type => type.type.name).join(', ');
    
    // Obtener imagen
    const imagen = pokemon.sprites.other['official-artwork'].front_default || 
                   pokemon.sprites.front_default || 
                   'https://via.placeholder.com/200';
    
    // Obtener sonido
    const sonido = pokemon.cries?.latest || '';
    
    // Obtener stats principales
    const stats = pokemon.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    // Crear HTML de la tarjeta
    const tarjeta = `
        <div class="pokemon-card">
            <div class="pokemon-image">
                <img src="${imagen}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
            
            <div class="pokemon-types">
                ${pokemon.types.map(type => 
                    `<span class="type-badge">${type.type.name}</span>`
                ).join('')}
            </div>

            <div style="border-top: 2px solid #eee; padding-top: 15px;">
                <h3 style="margin-bottom: 10px; color: #333;">Características</h3>
                <div class="pokemon-stats">
                    <div class="stat">
                        <div class="stat-name">Altura</div>
                        <div class="stat-value">${(pokemon.height / 10).toFixed(1)} m</div>
                    </div>
                    <div class="stat">
                        <div class="stat-name">Peso</div>
                        <div class="stat-value">${(pokemon.weight / 10).toFixed(1)} kg</div>
                    </div>
                </div>

                <h3 style="margin-top: 20px; margin-bottom: 10px; color: #333;">Stats Base</h3>
                <div class="pokemon-stats">
                    <div class="stat">
                        <div class="stat-name">HP</div>
                        <div class="stat-value">${stats.hp}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-name">Ataque</div>
                        <div class="stat-value">${stats.attack}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-name">Defensa</div>
                        <div class="stat-value">${stats.defense}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-name">Sp. Ataque</div>
                        <div class="stat-value">${stats['special-attack']}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-name">Sp. Defensa</div>
                        <div class="stat-value">${stats['special-defense']}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-name">Velocidad</div>
                        <div class="stat-value">${stats.speed}</div>
                    </div>
                </div>
            </div>

            ${sonido ? `<button class="sound-button" onclick="reproducirSonido('${sonido}')">🔊 Escuchar sonido</button>` : ''}
        </div>
    `;

    appDiv.innerHTML = tarjeta;
}

// Función para reproducir el sonido del Pokémon
function reproducirSonido(urlSonido) {
    const audio = new Audio(urlSonido);
    audio.play().catch(error => {
        console.error('Error al reproducir sonido:', error);
    });
}

// Manejar Enter en el input
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        buscarPokemon();
    }
}
