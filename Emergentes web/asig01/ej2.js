const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tu-base-de-datos', { useNewUrlParser: true, useUnifiedTopology: true });

// Define un esquema y un modelo
const Schema = mongoose.Schema;
const ejemploSchema = new Schema({
  nombre: String,
  edad: Number
});
const Ejemplo = mongoose.model('Ejemplo', ejemploSchema);

// Crea un nuevo documento y guárdalo en la base de datos
const nuevoEjemplo = new Ejemplo({ nombre: 'Juan', edad: 25 });
nuevoEjemplo.save((err, resultado) => {
  if (err) return console.error(err);
  console.log('Documento guardado:', resultado);
});
