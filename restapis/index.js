import express from 'express';
import clientesRoutes from './routes/clientesRoutes.js'; 
import mongoose from 'mongoose';
import productosRoutes from './routes/productosRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';

mongoose.set('strictQuery', true); // Evita warning de Mongoose

// Conectar a MongoDB local
mongoose.connect('mongodb://127.0.0.1:27017/restapis', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB local en 127.0.0.1'))
.catch(err => console.error(' Error al conectar a MongoDB:', err));

const app = express();

app.use(express.json()); 

// Rutas
app.use('/', clientesRoutes);
app.use('/', productosRoutes);
app.use ('/', pedidosRoutes)

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});


