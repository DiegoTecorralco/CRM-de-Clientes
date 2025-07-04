import {Schema, model} from 'mongoose';

const productosSchema = new Schema({
    codigo: {type: Number, unique: true},
    nombre: {type: String, trim: true},
    precio: {type: Number},
    imagen: {type: String},
    exitencias: {type: Number},
});

const Productos = model('Productos', productosSchema);
export default Productos;