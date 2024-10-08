// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // base: 'https://yfdd617235.github.io/ppi_2/', // Ruta base relativa
//   base: '/ppi_2/', // Ruta base relativa
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', //Dominio personalizado
});
