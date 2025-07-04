import express from 'express';
import productosController from '../controllers/productosController.js';

const productosRoutes = express.Router();

productosRoutes.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);
productosRoutes.get('/productos', productosController.mostrarProductos);
productosRoutes.get('/productos/:idProducto', productosController.mostrarProducto);
productosRoutes.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);
productosRoutes.delete('/productos/:idProducto', productosController.eliminarProducto);
export default productosRoutes;