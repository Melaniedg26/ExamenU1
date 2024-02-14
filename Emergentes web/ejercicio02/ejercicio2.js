//Temporizador con callback
function showMessage(callback) {
    setTimeout(() => {
        callback("Mensaje mostrado despues de 3 segundos")
    }, 3000)
}

showMessage((message) => {
    console.log(message)
})

//calculadora en js

function operate(x, y, operation, callback) {
    let result;
    switch (operation) {
        case "add":
            result = x + y;
            break;
        case "subtract":
            result = x - y;
            break;
        case "multiply":
            result = x * y;
            break;
        case "divide":
            result = x / y;
            break;
        default:
            result = "Operacion no valida"
    }
    callback(result);
}

operate(15, 5, "subtract", (result) => {
    console.log("resultado ", result)
})

//Preparacion de una receta

function cortarIngredientes(ingrediente, callback) {
    setTimeout(() => {
        console.log(`Cortando: ${ingrediente}`);
        callback();
    }, 1000);
}
function cocinar(accion, callback) {
    setTimeout(() => {
        console.log(`Cocinando: ${accion}`);
        callback();
    }, 1500);
}
function servirPlato(plato) {
    console.log(`¡Listo! Puedes disfrutar de: ${plato}`)
}
function prepararReceta(plato, callback) {
    console.log(`comenzando a preparar ${plato}`);
    cortarIngredientes("vegetales", () => {
        cocinar("saltear", () => {
            cortarIngredientes("pollo", () => {
                cocinar("freir", () => {
                    cocinar("mezclar todo",()=> {
                        servirPlato(plato);
                        callback();
                    })
                })
            })
        })
    })
}

prepararReceta("Pollo al wok",()=>{
    console.log("receta completada");
})