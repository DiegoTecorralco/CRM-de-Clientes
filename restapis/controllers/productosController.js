import Productos from "../models/Productos.js";
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import { fileURLToPath } from 'url';

// obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar el controlador
const productosController = {};

// configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/')); // asegúrate que esta carpeta exista
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1];
    cb(null, `${shortid.generate()}.${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Formato no válido (solo JPG o PNG)'));
  }
};

const upload = multer({ storage, fileFilter }).single('imagen');

// Middleware para subir archivo
productosController.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  });
};

// Agrega nuevos productos
productosController.nuevoProducto = async (req, res) => {
  const producto = new Productos(req.body);

  // Si se subió un archivo, guardar el nombre
  if (req.file) {
    producto.imagen = req.file.filename;
  }

  try {
    await producto.save();
    res.status(201).json({ message: 'Producto agregado exitósamente', producto });
  } catch (error) {
    res.status(400).json({ message: 'Error al agregar el producto', error: error.message });
  }
};

productosController.mostrarProductos = async (req, res) => {
    try {
    const productos = await Productos.find();
    res.status(200).json({message: "Productos obtenidos exitósamente",productos});    
    } catch (error) {
        res.status(500).json({message: "error al obtener los productos", error: mensaje.error})
    }
} 

productosController.mostrarProducto = async (req, res) => {
    const producto = await Productos.findById(req.params.idProducto);

    if (!producto) {
       return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({
      message: "Producto obtenido exitosamente",
      producto
    });
};

productosController.actualizarProducto = async (req, res) => {
  try {
    // Buscar el producto actual
    const productoExistente = await Productos.findById(req.params.idProducto);

    if (!productoExistente) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Construir nuevo producto con la información del body
    const nuevoProducto = req.body;

    // Si hay imagen nueva, usarla; si no, mantener la actual
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      nuevoProducto.imagen = productoExistente.imagen;
    }

    // Actualizar el producto
    const productoActualizado = await Productos.findByIdAndUpdate(
      req.params.idProducto,
      nuevoProducto,
      { new: true }
    );

    res.status(200).json({
      message: 'Producto actualizado correctamente',
      producto: productoActualizado
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error al actualizar el producto',
      error: error.message
    });
  }
};

productosController.eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Productos.findByIdAndDelete(req.params.idProducto);

    if (!productoEliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar producto", error: error.message });
  }
};


export default productosController;
