import Pedidos from "../models/Pedidos.js";

const pedidosController ={};

pedidosController.nuevoPedido = async (req, res) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.status(201).json({message: 'Se agregó un nuevo pedido correctamente ', pedido})
    } catch (error) {
        res.status(400).json({message: 'Error al crear el nuevo pedido', error: error.message})
    }
}

pedidosController.mostrarPedidos = async (req, res) => {
    try {
        const pedidos =  await Pedidos.find().populate('cliente').populate({
            path:'pedido.producto', //para que busque adentro del arreglo de pedido el parametro de "producto" mostrando toda la info por el metodo de populate
            model: 'Productos' //para que en el modelo de "Productos" busque la referencia porque sino no lo encuentra
        });
        res.status(200).json({message: "Pedidos Obtenidos Correctamente", pedidos})        
    } catch (error) {
        res.status(400).json({message: 'Error al obtener los pedidos', error: error.message})
    };
};


pedidosController.mostrarPedido = async (req, res) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: "pedido.producto", //para que busque adentro del arreglo de pedido el parametro de "producto" mostrando toda la info por el metodo de populate
        model: "Productos" //para que lo busque en el modelo de productos busque la referencia porque sino no lo encuentra
    });
    if (!pedido) {
        res.status(404).json({message: "El Pedido no exite", error: error.message})
    } 
    res.status(200).json({message: "Pedido obtenido correctamente", pedido})
};

pedidosController.actualizarPedido = async (req, res) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido},
            req.body, {new : true}).populate('cliente').populate({
        path: "pedido.producto", //para que busque adentro del arreglo de pedido el parametro de "producto" mostrando toda la info por el metodo de populate
        model: "Productos" //para que lo busque en el modelo de productos busque la referencia porque sino no lo encuentra
    });
        res.status(201).json({message: "Pedido actualizado correctamente", pedido});
    } catch (error) {
        res.status(400).json({message: "Error al actualizar el pedido"})
    }
}

pedidosController.eliminarPedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedidos.findByIdAndDelete(req.params.idPedido);

    if (!pedidoEliminado) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el pedido', error: error.message });
  }
};

export default pedidosController;