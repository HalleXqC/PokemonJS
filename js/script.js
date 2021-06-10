const baseUrl = 'https://pokeapi.co/api/v2/';
const $container = document.querySelector('.container');
const $prevBtn = document.querySelector('.prevBtn');
const $nextBtn = document.querySelector('.nextBtn');
const $page = document.querySelector('.page');
const limit = 20;
const total_pokemons = 1118;
const total_pages = Math.floor(total_pokemons / limit);
let pageCounter = 1;
let offsetCounter = 0;

function getRequest(url, query, cb){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}?${query}`);
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response)
    });
    xhr.addEventListener('error', err => {
        console.log(err);
    })
    xhr.send();
}

function getPokemonRequest(url, cb){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response);
    })
    xhr.addEventListener('error', e => {
        console.error(e);
    })
    xhr.send();
}

window.addEventListener('load', () => {
    getRequest(`${baseUrl}pokemon`, `offset=${offsetCounter}&limit=${limit}`, cb => {
        const array = cb.results.map((item, index) => cardTemplate(item, index)).join('');
        $container.innerHTML = array
    });
});

// window.addEventListener('load', () => {
//     let pokemonsData = [];
//     getRequest(`${baseUrl}pokemon`, `offset=${offsetCounter}&limit=${limit}`, cb => {
//         cb.results.forEach(item => {
//             getPokemonRequest(item.url, r => {
//                 pokemonsData.push({...item, ...r.sprites.other})
//                 localStorage.setItem('pokemonsData', JSON.stringify(pokemonsData));
//             });
//         });
//         const pokemons = JSON.parse(localStorage.getItem('pokemonsData'));
//         const array = pokemons.map(item => cardTemplate(item)).join('');
//         $container.innerHTML = array;
//     })
// })

function singlePokemon(url){
    getRequest(url, '', cb => {
        $container.innerHTML = `
            <div class="pokemon">
                <div class="pokemon-block">
                    <div class="pokemon-header">
                        <div class="pokemon-image">
                            <h1>${cb.name}</h1>
                            <img src="${cb.sprites.other.dream_world.front_default}">
                        </div>
                        <div class="pokemon-abilities">
                            <ul>
                                <li>Number: <span>№${cb.id}</span></li>
                                <li>Type: <span>${cb.types[0].type.name}</span></li>
                                <li>Base experience: <span>${cb.base_experience}</span></li>
                                <li>Height: <span>${(cb.height / 10)} m</span></li>
                                <li>Weight: <span>${(cb.weight / 10)} kg</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="pokemon-stats">
                        <hr>
                        <div class="stat">
                            <h4>${cb.stats[0].stat.name}:</h4>
                            <div class="stat-inline">
                                <div style="width:${cb.stats[0].base_stat}%;">${cb.stats[0].base_stat}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="stat">
                            <h4>${cb.stats[1].stat.name}:</h4>
                            <div class="stat-inline">
                                <div style="width:${cb.stats[1].base_stat}%;">${cb.stats[1].base_stat}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="stat">
                            <h4>${cb.stats[2].stat.name}:</h4>
                            <div class="stat-inline">
                                <div style="width:${cb.stats[2].base_stat}%;">${cb.stats[2].base_stat}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="stat">
                            <h4>${cb.stats[3].stat.name}:</h4>
                            <div class="stat-inline">
                                <div style="width:${cb.stats[3].base_stat}%;">${cb.stats[3].base_stat}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="stat">
                            <h4>${cb.stats[4].stat.name}:</h4>
                            <div class="stat-inline">
                                <div style="width:${cb.stats[4].base_stat}%;">${cb.stats[4].base_stat}</div>
                            </div>
                        </div>
                        <hr>
                    </div>

                    <div class="pokemon-footer">
                        <button onclick="reloadBtn()">Go back</button>
                    </div>
                </div>
            </div>
        `
    })
}

function reloadBtn(){
    window.location.reload();
}


function cardTemplate(item, index){
    if(index >= 898){
        if(index == 1025 || index == 1026 || index == 1050 || index == 1051){
            return ` 
                <div class="card">
                    <div class="card-title">
                        <p>${item.name} <span>#${(index + 1)}</span></p>
                    </div>
                    <div class="card-image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(index + 9102)}.png">
                    </div>
                    <div class="card-body">
                        <button class="moreBtn">More...</button>
                    </div>
                </div>
           `
        }else if(index == 1043){
            return `
                <div class="card">
                    <div class="card-title">
                        <p>${item.name} <span>#${(index + 1)}</span></p>
                    </div>
                    <div class="card-image">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(index + 9104)}.png" alt="${item.name}">
                    </div>
                    <div class="card-body">
                        <button class="moreBtn">More...</button>
                    </div>
                </div>
           `
        }else{
            return `
                <div class="card">
                    <div class="card-title">
                        <p>${item.name} <span>#${(index + 1)}</span></p>
                    </div>
                    <div class="card-image">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(index + 9103)}.png" alt="${item.name}">
                    </div>
                    <div class="card-body">
                        <button class="moreBtn">More...</button>
                    </div>
                </div>
           `
        }
    }else{
        return `
            <div class="card">
                <div class="card-title">
                    <p>${item.name} <span>#${(index + 1)}</span></p>
                </div>
                <div class="card-image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(index + 1)}.png">
                </div>
                <div class="card-body">
                    <button onclick="singlePokemon('${item.url}')" class="moreBtn">More...</button>
                </div>
            </div>
       `

    }
}


window.addEventListener('load', () => {
    $page.innerHTML = pageCounter;
    $prevBtn.setAttribute('disabled', true)
    $prevBtn.classList.add('disabled')
})

$nextBtn.addEventListener('click', e => {
    e.preventDefault();

    $prevBtn.removeAttribute('disabled');
    $prevBtn.classList.remove('disabled');
    if(pageCounter >= 1 && pageCounter <= total_pages){
        if(pageCounter == total_pages){
            $nextBtn.setAttribute('disabled', true);
            $nextBtn.classList.add('disabled');
            getRequest(`${baseUrl}pokemon`, `offset=${offsetCounter += limit}&limit=${limit}`, cb =>{
                pageCounter++;
                $page.innerHTML = pageCounter;
                const array = cb.results.map((item, index) => cardTemplate(item, index)).join('');
                $container.innerHTML = array;
            })
        }else{  
            getRequest(`${baseUrl}pokemon`, `offset=${offsetCounter += limit}&limit=${limit}`, cb =>{
                pageCounter++;
                $page.innerHTML = pageCounter;
                const array = cb.results.map((item, index) => cardTemplate(item, index)).join('');
                $container.innerHTML = array;
            })
        }
    }
})

$prevBtn.addEventListener('click', e => {
    e.preventDefault();

    if(pageCounter >= 1){
        pageCounter--;
        if(pageCounter === 1){
            $prevBtn.setAttribute('disabled', true);
            $prevBtn.classList.add('disabled');
            offsetCounter = 0;
            getRequest(`${baseUrl}pokemon`, `offset=${offsetCounter}&limit=${limit}`, cb => {
                $page.innerHTML = pageCounter;
                const array = cb.results.map((item, index) => cardTemplate(item, index)).join('');
                $container.innerHTML = array;
            })
        }else{
            getRequest(`${baseUrl}pokemon`, `offset=${offsetCounter -= limit}&limit=${limit}`, cb =>{
                $nextBtn.removeAttribute('disabled')
                $nextBtn.classList.remove('disabled')
                $page.innerHTML = pageCounter;
                const array = cb.results.map((item, index) => cardTemplate(item, index)).join('');
                $container.innerHTML = array;
            });
        }
    }
})