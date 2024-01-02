// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const container = document.querySelector('#container');
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'




// for (let i = 1; i <= 151; i++) {
//     const pokemon = document.createElement('div');
//     pokemon.classList.add('pokemon');
//     const label = document.createElement('span');
//     label.innerText = `#${i}`;
//     const newImg = document.createElement('img');
//     newImg.src = `${baseURL}${i}.png`


//     pokemon.appendChild(newImg);
//     pokemon.appendChild(label);
//     container.appendChild(pokemon);
// }

// Version ou on choisit l'id du pokemon et il pull up

const choice = document.createElement('input');
choice.type = 'number';
choice.min = 0;
choice.max = 151;
choice.placeholder = 'Choose a number';
container.after(choice);

choice.addEventListener('change', () => {
    if (container.firstElementChild) {
        container.firstElementChild.remove()
    }
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');
    const newImg = document.createElement('img');
    newImg.src = `${baseURL}${choice.value}.png`;
    pokemon.append(newImg)
    container.append(pokemon)
})
