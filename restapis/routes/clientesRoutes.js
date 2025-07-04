import express from 'express';
import clienteController from '../controllers/clienteController.js';

const clientesRoutes = express.Router();

//Routes Clientes
clientesRoutes.post('/clientes', clienteController.nuevoCliente);
clientesRoutes.get('/clientes', clienteController.mostrarClientes);
clientesRoutes.get('/clientes/:idCliente', clienteController.mostrarCliente);
clientesRoutes.put('/clientes/:idCliente', clienteController.actualizarCliente)
clientesRoutes.delete('/clientes/:idCliente', clienteController.eliminarCliente);

export default clientesRoutes;
