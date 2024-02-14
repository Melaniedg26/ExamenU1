const sc = require('readline-sync');

function calcularMaximoRepetido() {
    let numeros = [];
    let numero;
    do {
        numero = sc.question('Introduce un numero (0 para terminar): ');
            numeros.push(parseInt(numero));
    } while (numero !== '0');
    numeros.pop();
    const maximo = Math.max(...numeros);
    const repeticiones = numeros.filter(num => num === maximo).length;
    console.log(`El valor máximo es: ${maximo}`);
    console.log(`Aparece ${repeticiones} veces.`);
}
calcularMaximoRepetido();