// import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'http://localhost:3000/api', // Si no está definida la primera URL, usa localhost
//     withCredentials: true
// });

// export default instance;

//------------------------------------------------------------

// import axios from 'axios';
// import Cookies from 'js-cookie'; // Asegúrate de instalar 'js-cookie' si usas cookies

// const instance = axios.create({
//     baseURL: 'https://ppi-2-1.onrender.com/api', 
//     withCredentials: true, // Permitir el uso de cookies en solicitudes
// });

// // Función para despertar el servidor
// export const wakeUpServer = async () => {
//     try {
//       await instance.get('/ping');
//       console.log('Servidor activado');
//     } catch (error) {
//       console.error('Error al activar el servidor:', error);
//     }
//   };

// // Agregar el token en el encabezado de todas las solicitudes usando un interceptor
// instance.interceptors.request.use(
//     (config) => {
//         // Obtener el token desde las cookies (o puedes usar localStorage si prefieres)
//         const token = Cookies.get('token'); 

//         if (token) {
//             // Si existe el token, lo agregamos al encabezado Authorization
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default instance;




//----------------------------------------------

import axios from 'axios';
import Cookies from 'js-cookie'; // Asegúrate de instalar 'js-cookie' si usas cookies

// Definir las URLs de los servidores
const LOCAL_URL = 'http://localhost:3000/api';
const PRODUCTION_URL = 'https://ppi-2-1.onrender.com/api';

// Crear la instancia de Axios
const instance = axios.create({
  withCredentials: true, // Permitir el uso de cookies en solicitudes
});

// Función para verificar si el servidor local está disponible y configurar la baseURL
export const initializeAxios = async () => {
  try {
    // Intentar hacer una solicitud GET a localhost:3000/api/ping
    let response = await axios.get(`${LOCAL_URL}/ping`);
    if (response.status === 200) {
      // Cambiar a la URL local si está disponible
      instance.defaults.baseURL = LOCAL_URL;
      console.log('Local server available, Connected to: ', instance.defaults.baseURL);
    }
  } catch {
    instance.defaults.baseURL = PRODUCTION_URL;
    let response = await axios.get(`${PRODUCTION_URL}/ping`);
    console.log('Local server NOT available, switched to production URL', response.data);

  }
};

// Llamar a la función para inicializar Axios
initializeAxios();

export const wakeUpServer = async () => {
  try {
    await instance.get('/ping');
    console.log('Server activated');
  } catch (error) {
    console.error('Error al activar el servidor:', error);
  }
};

// Agregar el token en el encabezado de todas las solicitudes usando un interceptor
instance.interceptors.request.use(
  (config) => {
    // Obtener el token desde las cookies
    const token = Cookies.get('token');

    if (token) {
      // Si existe el token, lo agregamos al encabezado Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;