var pokmeonNames = ['bulbasaur', 'ivysaur', 'venasaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu']

function random (arr) {
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

console.log(random(pokmeonNames))
