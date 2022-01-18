// Aqui fazendo apenas alguns testes com o typescript e seu transpiler.

var minhaVar = 'minha variável'; // JavaScript puro, vanilla.

function minhaFunc(x, y) {
    return x + y;
}

// ES6 ou ES2015
// Recommended es6-features.org
let num = 2;
const PI = 3.14;

var numero = [1,2,3];

numero.map(function(valor) {
    return valor * 2;
});

numero.map( valor => valor * 2);

class Matematica {
    soma(x, y){
        return x + y;
    }
}