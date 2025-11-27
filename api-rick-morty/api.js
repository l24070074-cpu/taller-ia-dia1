// URL base de la API de Rick and Morty
const API_URL = 'https://rickandmortyapi.com/api/character';

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const container = document.getElementById('container');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');

// Event listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Función principal de búsqueda
async function handleSearch() {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        showError('Por favor ingresa un ID o nombre para buscar');
        return;
    }

    showLoading(true);
    hideError();

    try {
        let characters = [];

        // Si es un número, buscar por ID
        if (!isNaN(searchTerm)) {
            const character = await fetchCharacterById(searchTerm);
            characters = [character];
        } else {
            // Si es texto, buscar por nombre
            characters = await fetchCharactersByName(searchTerm);
        }

        displayCharacters(characters);
    } catch (error) {
        showError(error.message);
        container.innerHTML = '';
    } finally {
        showLoading(false);
    }
}

// Obtener personaje por ID
async function fetchCharacterById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Personaje no encontrado');
            }
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Error al obtener personaje: ${error.message}`);
    }
}

// Obtener personajes por nombre
async function fetchCharactersByName(name) {
    try {
        const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('No se encontraron personajes con ese nombre');
        }

        return data.results;
    } catch (error) {
        throw new Error(`Error al buscar personajes: ${error.message}`);
    }
}

// Mostrar personajes en las tarjetas
function displayCharacters(characters) {
    container.innerHTML = '';

    if (characters.length === 0) {
        container.innerHTML = '<div class="no-results">No se encontraron personajes</div>';
        return;
    }

    characters.forEach((character) => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

// Crear tarjeta de personaje
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'character-card';

    const statusClass = `status-${character.status.toLowerCase()}`;
    const statusBadge = `<span class="status-badge ${statusClass}">${character.status}</span>`;

    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="character-image">
        <div class="character-info">
            <div class="character-name">${character.name}</div>
            <div class="character-detail">
                <strong>Estado:</strong>
                <span>${character.status}</span>
            </div>
            <div class="character-detail">
                <strong>Especie:</strong>
                <span>${character.species}</span>
            </div>
            <div class="character-detail">
                <strong>Ubicación:</strong>
                <span>${character.location?.name || 'Desconocida'}</span>
            </div>
            ${statusBadge}
        </div>
    `;

    return card;
}

// Mostrar mensaje de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Ocultar mensaje de error
function hideError() {
    errorMessage.classList.remove('show');
}

// Mostrar/ocultar loading
function showLoading(show) {
    if (show) {
        loading.classList.add('show');
    } else {
        loading.classList.remove('show');
    }
}

// Cargar personajes iniciales (los primeros 12)
async function loadInitialCharacters() {
    showLoading(true);
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        showError('Error al cargar los personajes iniciales');
    } finally {
        showLoading(false);
    }
}

// Cargar personajes al iniciar la página
document.addEventListener('DOMContentLoaded', loadInitialCharacters);
