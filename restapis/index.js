import express from 'express';
import router from './routes/index.js'; 
import mongoose from 'mongoose';



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
app.use('/', router);

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});


