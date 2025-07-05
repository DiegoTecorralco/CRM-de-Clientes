import {Schema, model } from 'mongoose';

const pedidosSchema = new Schema ({
    cliente: ({ type: Schema.ObjectId, ref: 'Clientes'}),
    pedido:[{
        producto:{type: Schema.ObjectId, ref: 'Productos'},
        cantidad: {type: Number}
    }],
    total: {type: Number}
});

const Pedidos = model('Pedidos', pedidosSchema);

export default Pedidos;