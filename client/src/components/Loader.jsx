import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen space-x-2">
      {/* Círculos animados para simular un efecto de carga pulsante */}
      <div className="h-4 w-4 bg-blue-800 rounded-full animate-pulse delay-100"></div>
      <div className="h-4 w-4 bg-blue-900 rounded-full animate-pulse delay-300"></div>
      <div className="h-4 w-4 bg-blue-950 rounded-full animate-pulse delay-500"></div>
    </div>
  );
};

export default Loader;

