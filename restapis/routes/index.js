import express from 'express';
import clienteController from '../controllers/clienteController.js';

const router = express.Router();

router.post('/clientes', clienteController.nuevoCliente);
router.get('/clientes', clienteController.mostrarClientes);
router.get('/clientes/:idCliente', clienteController.mostrarCliente);
export default router;
