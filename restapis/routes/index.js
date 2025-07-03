const express = require ('express')
const router = express.Router();
const clienteController = require('../controllers/clienteController');

module.exports = function (){
   //Agregar clentes via POST
   router.post('/clientes', clienteController.nuevoCLiente)
    return router;
}