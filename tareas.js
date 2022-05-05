const fs = require('fs');                                   // requerimos la librería 'fs' para poder leer otros archivos dentro de nuestro proyecto 'app-tareas'
const { stringify } = require('querystring');               // ?? esta constante se creó sola cuando usé el método stringify

let archivoTareas = {
  archivo: "tareas.json",               // la propiedad 'archivo' almacena el file 'tareas.json'
  leerJSON: function () {               // creo un MÉTODO (cuando creamos una FUNCIÓN dentro de un OBJETO LITERAL, lo llamamos MÉTODO de ese objeto)
    let tareas = fs.readFileSync(__dirname + "/tareas.json", "utf-8");
    return JSON.parse(tareas);          // me devuelve un array de objetos literales
  },

  escribirJSON: function (unArrayDeTareas) {                  // Recibe un array de objetos litereales, lo stringifica y sobreescribe tareas.json
    let tareasAString = JSON.stringify(unArrayDeTareas);      // AYUDAMEMORIA>>> fs.writeFileSync( file, data, options )
    fs.writeFileSync(this.archivo, tareasAString);
  },

  listarTareas: function () {
    console.log('-----------------------------------------------------------------------');
    console.log("LISTADO DE TAREAS");
    console.log('-----------------------------------------------------------------------');
    let arrayTareas = this.leerJSON();
    arrayTareas.forEach(function (item, index) {
      console.log(index + 1 + ". " + arrayTareas[index].titulo + " - " + arrayTareas[index].estado );
    });
    console.log('-----------------------------------------------------------------------');
},

  guardarTarea: function (nuevaTarea) {
    let agregadorDeTareas = this.leerJSON(); //<---me devuelve un ARRAY de objetos literales que guardo en una variable (let)
    agregadorDeTareas.push(nuevaTarea); //<---Tomo ese ARRAY y 'pusheo' un elemento nuevo (que pasaré luego como parámetro en el file app.js
    this.escribirJSON(agregadorDeTareas); //<---recibe el nuevo ARRAY ya pusheado, lo convierte a STRING y sobreescribe tareas.json
  },

  borrarTarea: function (borrarTareaN) {
    let tareas = this.leerJSON();
    let removedTareas = tareas.filter((ele, i) => i !== borrarTareaN - 1)
    if (borrarTareaN <= tareas.length){
        console.log('✅ TAREA BORRADA 👉 '+ + borrarTareaN +'.'+ tareas[borrarTareaN-1].titulo);
        this.escribirJSON(removedTareas)
    } else {
        console.log("🧐 ¿Estás seguro que quisiste decir " + borrarTareaN + "? \nRelajáte! No tenés tantas tareas en tu lista");
    };
    },

  filtrarPorEstado: function (estado) {
    let tareas = this.leerJSON(); //<---me devuelve un ARRAY de objetos literales que guardo en una variable (let)
    let arrayFiltrado = tareas.filter(
      (
        unArray // SINTAXIS: let newArray = arr.filter(callback(currentValue[, index[, array]])[, thisArg])
      ) => unArray.estado === estado
    ); //<---me devuelve un ARRAY de objetos filtrados que coincidan con el parámetro 'estado'
    return arrayFiltrado;
  },

  terminarTarea: function (numeroDeTarea) {
    let tareas = this.leerJSON();
    let estadoTarea = tareas[numeroDeTarea - 1];
    estadoTarea.estado = "Terminado";
    this.escribirJSON(tareas);
  },
};

module.exports = archivoTareas;                             // EXPORTO archivoTareas COMO UN MÓDULO para poder requerirlo desde otros ficheros del proyecto.








