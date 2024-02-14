
// Modulos clases que se necesitan
const fs = require('fs');
const readline = require('readline');
const Alumno = require('./alumnos');
const Carrera = require('./carreras');

const rl = readline.createInterface({
    input: process.stdin, //proceso de entrada (pregunta o instrucciones para leer entrada de datos)
    output: process.stdout //funcion que procesa el dato recibido en el input lo transforma y genera un output
});

const dataFolder = './data/';
const alumnosFile = dataFolder + 'alumnos.json';
const carrerasFile = dataFolder + 'carreras.json';

let alumnos = [];
let carreras = [];

function cargarDatos() {
    try {
        alumnos = JSON.parse(fs.readFileSync(alumnosFile, 'utf8'));
        carreras = JSON.parse(fs.readFileSync(carrerasFile, 'utf8'));
    } catch (error) { 
        alumnos = [];
        carreras = [];
    }
}

function guardarDatos() {
    fs.writeFileSync(alumnosFile, JSON.stringify(alumnos, null, 2));
    fs.writeFileSync(carrerasFile, JSON.stringify(carreras, null, 2));
}

function mostrarMenuPrincipal() {
    console.log('\n** Menú **');
    console.log('1. Alumnos');
    console.log('2. Carreras');
    console.log('3. Salir');
}

function mostrarSubMenuEntidad(entidad) {
    console.log(`\n** ${entidad} **`);
    console.log('1. Ver listado');
    console.log('2. Agregar');
    console.log('3. Borrar');
    console.log('4. Cambiar');
    console.log('5. Agregar alumno a carrera');
    console.log('6. Volver al menú principal');
}

function mostrarListado(entidad,callback) {
        console.log(`\nListado de ${entidad}:`);
    
        const lista = (entidad === 'alumnos') ? alumnos : carreras;
    
        if (lista.length === 0) {
            console.log(`No hay ${entidad} registrados.`);
            if (callback && typeof callback === 'function') {
                callback();
            }
        } else {
            lista.forEach((elemento, index) => {
                console.log(`${index}. ID: ${elemento.id}, Nombre: ${elemento.nombre}, Carrera: ${elemento.carrera}`);
            });
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    }


    function agregar(entidad, clase) {
        rl.question(`Ingrese el nombre del nuevo ${entidad}: `, nombre => {
            const nuevoElemento = new clase(alumnos.length, nombre); // Suponemos que el id es el índice
            if (entidad === 'alumnos') {
                alumnos.push(nuevoElemento);
            } else if (entidad === 'carreras') {
                carreras.push(nuevoElemento);
            }
            guardarDatos();
            console.log(`${entidad} agregado exitosamente.`);
            mostrarListado(entidad, () => seleccionarAccionEntidad(entidad));  // Mostrar listado y luego seleccionar acción
        });
}

function borrar(entidad, clase) {
    mostrarListado(entidad);
    rl.question(`Ingrese el ID del ${entidad} que desea borrar: `, id => {
        const index = parseInt(id, 10);
        if (!isNaN(index) && index >= 0 && index < alumnos.length) {
            if (entidad === 'alumnos') {
                alumnos.splice(index, 1);
            } else if (entidad === 'carreras') {
                carreras.splice(index, 1);
            }
            guardarDatos();
            console.log(`${entidad} borrado exitosamente.`);
        } else {
            console.log('ID no válido. Intente de nuevo.');
        }
        mostrarListado(entidad, () => seleccionarAccionEntidad(entidad));  // Mostrar listado y luego seleccionar acción
    });
}

function cambiar(entidad, clase) {
    mostrarListado(entidad);
    rl.question(`Ingrese el ID del ${entidad} que desea cambiar: `, id => {
        const index = parseInt(id, 10);
        if (!isNaN(index) && index >= 0 && index < alumnos.length) {
            rl.question(`Ingrese el nuevo nombre del ${entidad}: `, nuevoNombre => {
                const nuevoElemento = new clase(nuevoNombre);
                if (entidad === 'alumnos') {
                    alumnos[index] = nuevoElemento;
                } else if (entidad === 'carreras') {
                    carreras[index] = nuevoElemento;
                }
                guardarDatos();
                console.log(`${entidad} cambiado exitosamente.`);
            });
        } else {
            console.log('ID no válido. Intente de nuevo.');
        }
        mostrarListado(entidad, () => seleccionarAccionEntidad(entidad));  // Mostrar listado y luego seleccionar acción
    });
}

function asignarAlumnoACarrera() {
    mostrarListado('alumnos', () => {
        rl.question(`Ingrese el ID del alumno que desea asignar a una carrera: `, idAlumno => {
            const indexAlumno = parseInt(idAlumno, 10);

            if (!isNaN(indexAlumno) && indexAlumno >= 0 && indexAlumno < alumnos.length) {
                mostrarListado('carreras', () => {
                    rl.question(`Ingrese el ID de la carrera a la que desea asignar al alumno: `, idCarrera => {
                        const indexCarrera = parseInt(idCarrera, 10);

                        if (!isNaN(indexCarrera) && indexCarrera >= 0 && indexCarrera < carreras.length) {
                            // Asigna el alumno a la carrera
                            alumnos[indexAlumno].carrera = carreras[indexCarrera].nombre;
                            guardarDatos();
                            console.log('Alumno asignado a la carrera exitosamente.');
                        } else {
                            console.log('ID de carrera no válido. La asignación no se realizó.');
                        }

                        seleccionarAccionEntidad('alumnos');
                    });
                });
            } else {
                console.log('ID de alumno no válido. La asignación no se realizó.');
                seleccionarAccionEntidad('alumnos');
            }
        });
    });
}

function seleccionarAccionPrincipal() {
    cargarDatos();
    mostrarMenuPrincipal();
    rl.question('Seleccione una opción: ', opcion => {
        switch (opcion) {
            case '1':
                seleccionarAccionEntidad('alumnos');
                break;
            case '2':
                seleccionarAccionEntidad('carreras');
                break;
            case '3':
                console.log('¡Hasta luego!');
                guardarDatos();
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                seleccionarAccionPrincipal();
        }
    });
}

// Modifica la función para seleccionar acción en entidad (listado, agregar, borrar, cambiar)
function seleccionarAccionEntidad(entidad) {
    cargarDatos();
    mostrarSubMenuEntidad(entidad);
    rl.question(`Seleccione una opción en ${entidad}: `, opcion => {
        switch (opcion) {
            case '1':
                mostrarListado(entidad);
                seleccionarAccionEntidad(entidad);
                break;
            case '2':
                agregar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '3':
                borrar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '4':
                cambiar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '5':
                asignarAlumnoACarrera();
                break;
            case '6':
                seleccionarAccionPrincipal();
                break;
            default:
                console.log('Opción no válida.');
                seleccionarAccionEntidad(entidad);
        }
    });
}

// Iniciar el programa
seleccionarAccionPrincipal();
