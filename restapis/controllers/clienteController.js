import Cliente from '../models/Clientes.js';

const clienteController = {};

clienteController.nuevoCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json({ mensaje: 'Cliente creado correctamente', cliente });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al crear cliente', error: error.message });
  }
};

clienteController.mostrarClientes = async (req,res) => {
    try {
        const Clientes = await Cliente.find();
        res.json(Clientes);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al mostrar los clientes', error: error.message });
    }
}

clienteController.mostrarCliente = async (req, res) => {
    const cliente = await Cliente.findById(req.params.idCliente);
    if(!cliente){
        res.json({message: 'Ese cliente no existe'})
    }
    res.json(cliente);
}


clienteController.actualizarCliente = async (req,res) => {
  try {
    const cliente = await Cliente.findOneAndUpdate ({ _id : req.params.idCliente}, 
    req.body, {
      new: true
    });
    res.json({message: 'Cliente Actualizado con exito', cliente});
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar Cliente", error: error.mensaje }); 
  }
}

clienteController.eliminarCliente= async (req,res) => {

  try {
    await Cliente.findByIdAndDelete( {_id : req.params.idCliente})
  res.json({message: 'El Cliente ha sido eliminado exitosamente'});
  } catch (error) {
    res.status(400).json({ message: "Error al eliminqr al cliente", error: error.mensaje }); 
  }
  0
};

export default clienteController;

