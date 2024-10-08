import app from './app.js';
import { connectDB } from './db.js'; // Importar la función para conectar la base de datos

// Conectar a la base de datos primero
connectDB().then(() => {
    console.log('Database connected');


    // Utiliza el puerto asignado o el puerto 3000 por defecto
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`>>> Server on port ${PORT}`);
    });
});
