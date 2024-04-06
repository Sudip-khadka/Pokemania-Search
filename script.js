const url = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const btn = document.getElementById('search-button');

btn.addEventListener('click', () => {
    const pokemonInput = document.getElementById('search-input').value.trim().toLowerCase();
    const typesElement = document.getElementById('types');
    typesElement.innerHTML = ''; // Clear previous types

    fetch(`${url}/${pokemonInput}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Pokémon not found');
                } else {
                    throw new Error('An error occurred while fetching Pokémon data');
                }
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('pokemon-name').innerText = data.name.toUpperCase();
            document.getElementById('pokemon-id').innerText = '#' + data.id;
            document.getElementById('weight').innerText = 'Weight: ' + data.weight;
            document.getElementById('height').innerText = 'Height: ' + data.height;
            document.getElementById('hp').innerText = data.stats[0].base_stat;
            document.getElementById('attack').innerText = data.stats[1].base_stat;
            document.getElementById('defense').innerText = data.stats[2].base_stat;
            document.getElementById('special-attack').innerText = data.stats[3].base_stat;
            document.getElementById('special-defense').innerText = data.stats[4].base_stat;
            document.getElementById('speed').innerText = data.stats[5].base_stat;

            // Set types
            data.types.forEach(typeObj => {
                const typeElement = document.createElement('span');
                typeElement.textContent = typeObj.type.name.toUpperCase();
                typesElement.appendChild(typeElement);
            });

            document.getElementById('sprite').src = data.sprites.front_default;
            document.getElementById('sprite').style.display = 'block'; // Show the sprite
            alert("Pokémon found!");
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
            alert(error.message);
        });
});