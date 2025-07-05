import express from 'express'
import pedidosController from '../controllers/pedidosController.js'

const pedidosRoutes = express.Router();

pedidosRoutes.post('/pedidos', pedidosController.nuevoPedido);
pedidosRoutes.get('/pedidos', pedidosController.mostrarPedidos);
pedidosRoutes.get('/pedidos/:idPedido', pedidosController.mostrarPedido);
pedidosRoutes.put('/pedidos/:idPedido', pedidosController.actualizarPedido);
pedidosRoutes.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

export default pedidosRoutes;