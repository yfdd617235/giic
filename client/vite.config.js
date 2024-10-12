
// For github pages
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: '/giic/', // cuando se tiene en github (base relativa)
// });



// For customised domains:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', //cuando se tiene un Dominio personalizado
});
