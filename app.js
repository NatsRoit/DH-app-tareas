const archivo = require('./tareas');

let accion = process.argv[2];       // el método .argv[index]  me permite leer lo q escribo por consola y lo interpreta como un ARRAY:
let argumento = process.argv[3];    // [node , app.js , listar, argumento]--> cada elemento q leo por consola tiene un índice. Si no hay nada en ese índice, me dará UNDEFINED 

switch (accion) {
    case 'listar':
        archivo.listarTareas()
        break;

    case 'crear':                                    // CASO 2 = [node] [app.js] [crear] ['un string']
        let tarea = {                                // creo una variable que contendrá un OBJETO LITERAL. Defino sus PROPIEDADES:
            titulo: process.argv[3],                 // propiedad TÍTULO: toma su valor del [3] que pasé por consola
            estado: 'Pendiente',                     // propiedad ESTADO: se pide que sea siempre 'pendiente'.
        };
            if (tarea.titulo !== undefined){         // Si NO paso un string luego de la palabra 'crear', NO se ejecuta.
            archivo.guardarTarea(tarea);             // si SI paso un string: Aplico 'guardarTarea' con ese string como elemento a pushear
            console.log('✅ TAREA CREADA');
        }   else {
            console.log('-----------------------------------------------------------------------'); 
            console.log("QUÉ QUIERES CREAR?");
                console.log('-----------------------------------------------------------------------'); 
                console.log("Usa las comillas dobles \" \" para ingresar tu argumento");
                console.log("👉 EJEMPLO: crear \"Preparar la cena\"");
                console.log("Luego vuelve a LISTAR las tareas para ver \ntu nueva tarea en el listado de tareas");
                console.log('-----------------------------------------------------------------------'); 
            };
        break; 

        case 'terminar':
        let tareaTerminada = process.argv[3];
            if (tareaTerminada !== undefined){    // Si NO paso un numero luego de la palabra 'terminar', NO se ejecuta.
            archivo.terminarTarea(tareaTerminada);        // si SI paso un parámetro: Aplico 'terminarTarea' con ese índice.estado
            console.log('✅ TAREA ACTUALIZADA');
            archivo.listarTareas()
        }   else {
            console.log('-----------------------------------------------------------------------');
            console.log("QUÉ TAREA QUIERES TERMINAR?");
            console.log('-----------------------------------------------------------------------');
            console.log("Puedes LISTAR las tareas para seleccionar una tarea por NÚMERO");
            console.log("👉 EJEMPLO: terminar 1");
            console.log('-----------------------------------------------------------------------');
            };
        break; 

        case 'borrar':
        let borrarTareaN = process.argv[3];
            if (borrarTareaN !== undefined){
                archivo.borrarTarea(borrarTareaN);
                archivo.listarTareas()
        }   else {
            console.log('---------------------------------------------------'); 
            console.log('❗️❗️❗️ ATENCIÓN: ESTA ACCIÓN NO SE PUEDE DESHACER');
            console.log('---------------------------------------------------');
            console.log('Qué tarea quieres borrar? 👉 EJEMPLO: borrar 1');
            archivo.listarTareas()
        };
        break; 

        case 'filtrar':         // CASO 3 = [node] [app.js] [filtrar] ['un string']
        let estado = process.argv[3];
            if (estado !== undefined){
                let resultado = archivo.filtrarPorEstado(estado)    // Retorna un array
                console.log('----------------------');
                console.log('LISTADO DE TAREAS');
                console.log('----------------------');
                resultado.forEach(function(item, index){            // Me lista cada uno de los elementos del array filtrado
                    console.log((index + 1) +'. ' + resultado[index].titulo
                    + ' - ' + resultado[index].estado);
                });
                console.log('----------------------------------------');
            } else {                                                  // Me advierte que debo agregar un parámetro para 'filtrar'
                console.log('---------------------------');
                console.log('DEBES SELECCIONAR UN FILTRO');
                console.log('---> filtrar \"Pendiente\"')
                console.log('---> filtrar \"En progreso\"')
                console.log('---> filtrar \"Terminada\"')
                console.log('---------------------------');
            };
        break;

    case 'meditar' :        // CASO ALTERNATIVO = [node] [app.js] [filtrar] 
        console.log('')  
        console.log('.----------.----.-----.-------------.--.-----.⤵︎ .')  
        console.log('|  ┌────┐  |    |  ─┐ |  ┌───  ┌──  |  |     |  |')
        console.log('|  |    │  └─┘  └╴  | |__|  ───┴────┐  |  |  |  |')
        console.log('|  |  | ├───────────|    └───────┐  └─────┘  |  |')
        console.log('|  |__| !  |  ______  |________  |     ⎮  ______|')
        console.log('|  ___  |  |____  |  _______   | |__⎮  ⎮_____   |')
        console.log('|_____| |_____ |  |  ,____  |  |___________  |  |')
        console.log('|  ____________!  |  |__  | |________  |  |  |  |')
        console.log('|  |  | __________|  | ___|_____ |  |  |  ___|  |')
        console.log('|__|  |__  | |  |  __|__    _____|  |  |__|  ___|')
        console.log('|   _______| |  |____  |  |__  |    |___  |___  |')
        console.log('|  |_________|_________|____|____|_____|________|');
        console.log(' 😀\n---------------------------------------------');        
        console.log("AHORA SÍ ESTÁS LISTO? Prueba a requerir una de las siguientes tareas:");
        console.log('---> listar');
        console.log('---> crear');
        console.log('---> borrar');
        console.log('---> filtrar \(\"Pendiente\"\) \(\"En progreso\"\) \(\"Terminada\"\)');
        console.log('-----------------------------------------------------------------------'); 
        break;

        case 'hola':
            console.log('----------------------------------------');        
            console.log('Hola! Qué quieres hacer?');                   // He omitido el break para que la acción continue en 'case Undefined'

        case undefined :                                               // CASO 4 = [node] [app.js] y no escribo nada más (por lo tanto no existe el índice [2] y me da undefined)
        console.log('-----------------------------------------------------------------------'); 
        console.log("Tienes que requerir una acción.");
        console.log("Las acciones disponibles son:");
        console.log('---> listar');
        console.log('---> crear');
        console.log('---> borrar');
        console.log('---> filtrar \(\"Pendiente\"\) \(\"En progreso\"\) \(\"Terminada\"\)');
        console.log('-----------------------------------------------------------------------'); 
        break;

    default:                                // CASO 5 = [node] [app.js] ['cualquiera cosa'] Se ejecuta cuando escribimos algo que no hemos definido en los casos anteriores
        console.log('------------------------------');
        console.log("No entiendo qué quieres hacer.");
        console.log("Prueba a \"MEDITAR\" unos minutos y vuelve a intentarlo más tarde");
        console.log("Las acciones disponibles son:");
        console.log('---> listar');
        console.log('---> crear');
        console.log('---> borrar');
        console.log('---> filtrar \(\"Pendiente\"\) \(\"En progreso\"\) \(\"Terminada\"\)');
        console.log('-----------------------------------------------------------------------'); 
        break;
};



/*    case ['crear'] + [undefined]:   // CASO 2.1 = [node] [app.js] [crear] ['un string']
        console.log('----------------------------------------');        
        console.log("QUÉ QUIERES CREAR?");
        console.log("Usa las comillas dobles \" \" para ingresar tu argumento");
        console.log("EJEMPLO: crear \"escribe aquí la nueva tarea\"");
        break;    

        */