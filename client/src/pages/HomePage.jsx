import React, { useState, useEffect } from 'react';
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import Loader from '../components/Loader';
import { wakeUpServer } from '../api/axios'; // Importa la función wakeUpServer

const HomaPage = () => {

  useEffect(() => {
    // Llamada para despertar el servidor cuando la página cargue
    wakeUpServer();
  }, []); // Solo se ejecuta una vez al montar el componente

  const [loading, setLoading] = useState(true);
  const [elementsToLoad, setElementsToLoad] = useState(1); // Ajusta según la cantidad total de elementos multimedia

  // Maneja la carga de cada elemento
  const handleLoad = () => {
    console.log("Video loaded"); // Confirmar que el manejador se llama
    setElementsToLoad((prev) => {
      console.log("Elements to load:", prev - 1); // Verificar el conteo
      return prev - 1;
    });
  };

  // Efecto para ocultar el loader cuando se han cargado todos los elementos
  useEffect(() => {
    if (elementsToLoad <= 0) {
      setLoading(false);
    }
  }, [elementsToLoad]); // Agregar como dependencia

  return (
    <div className="flex flex-col pt-10">

      {/* <div
        className="h-screen w-full bg-center flex justify-center items-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(183, 202, 253, 0.842), rgba(255, 255, 255)),
            url('${import.meta.env.BASE_URL}banner.webp.jpg')`,
          backgroundSize: 'cover', // Ajusta el tamaño de fondo para cubrir el contenedor
          backgroundRepeat: 'no-repeat', // Evita la repetición vertical y horizontal
          backgroundPosition: 'center center' // Centra la imagen
        }}
      >
        <img
          className="max-w-full max-h-full lg:p-32 pl-3"
          src={`${import.meta.env.BASE_URL}logo_giic_big.svg`}
          alt="Logo"
        />
      </div> */}

      <div className="z-50">
        {loading && (
          <Loader />
        )}
      </div>

      <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-20"
          src={`${import.meta.env.BASE_URL}ejecutivo.mp4`}
          poster={`${import.meta.env.BASE_URL}ejecutivo.png`}
          muted
          autoPlay
          loop
          playsInline
          onLoadedData={handleLoad} // Se dispara cuando el video comienza a reproducirse
          onError={(e) => {
            console.error("Video failed to load", e); // Manejo de errores
            e.target.style.display = 'none';
          }}
        >Your browser does not support the video tag.</video>
        {/* Fondo negro con opacidad */}
        <div className="absolute inset-0 bg-blue-950 opacity-35 -z-10" />

        {/* Imagen centrada */}
        <img
          className="relative z-10 max-w-full px-24 h-2/5"
          src={`${import.meta.env.BASE_URL}logo_giic.svg`}
          alt="Logo"
        />
      </div>


      {/* Cards Section */}
      {/* <div className="container mx-auto my-8 px-4 md:px-10 pt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        
          <div className="h-full shadow-md border border-zinc-600 rounded-lg">
            <img
              src={`${import.meta.env.BASE_URL}contrato.jpg`}
              alt="Project 1"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4 md:p-6">
              <h5 className="text-base md:text-xl font-semibold">CONSULTING</h5>
              <br />
              <div className="flex flex-col space-y-3 text-left">
                <p className="text-xs md:text-lg">- Projects Structuring</p>
                <p className="text-xs md:text-lg">- Evaluation and Valuation of companies and projects</p>
                <p className="text-xs md:text-lg">- Networking, Startups and angel investors</p>
              </div>
            </div>
          </div>

       
          <div className="h-full shadow-md border border-zinc-600 rounded-lg">
            <img
              src={`${import.meta.env.BASE_URL}computer.jpg`}
              alt="Project 2"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4 md:p-6">
              <h5 className="text-base md:text-xl font-semibold">INVESTMENTS</h5>
              <br />
              <div className="flex flex-col space-y-3 text-left">
                <p className="text-xs md:text-lg">- Leverage for Environmental Investments</p>
                <p className="text-xs md:text-lg">- Financial arbitraje with licensed entities</p>
                <p className="text-xs md:text-lg">- International Commerce (Food and other commodities)</p>
                <p className="text-xs md:text-lg">- Algorithmic trading and market analysis Software</p>
              </div>
            </div>
          </div>

       
          <div className="h-full shadow-md border border-zinc-600 rounded-lg">
            <img
              src={`${import.meta.env.BASE_URL}project.jpg`}
              alt="Project 3"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4 md:p-6">
              <h5 className="text-base md:text-xl font-semibold">
                SUSTAINABLE DEVELOPMENT GOALS PROJECTS (SDG)
              </h5>
              <br />
              <div className="flex flex-col space-y-3 text-left">
                <p className="text-xs md:text-lg">- Structuring</p>
                <p className="text-xs md:text-lg">- Implementation, support and management</p>
                <p className="text-xs md:text-lg">- Promotion and marketing for fundraising</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      {/*About us*/}
      <div id="about" className="snap-section section md:my-32 text-sm md:text-base">
        <div className="text-white" style={{ backgroundColor: "#131921" }}>
          <div className="container gap-10 flex flex-col md:flex-row justify-center items-center mx-auto px-4 lg:px-20">

            <div className="md:w-1/2 pt-10 md:py-10">
              <h2 className="md:text-2xl font-bold text-center">About Us</h2> <br />
              <div className="flex flex-col space-y-3 text-left">
                <p className="text-xs md:text-lg text-justify">We are committed to supporting businesses and projects with expert structuring and management. Our services include precise evaluation and valuation, and hands-on implementation support. Additionally, we provide targeted promotion and marketing strategies, helping each project reach its full potential. Our mission is to drive growth and establish a solid foundation for lasting success.</p>
              </div>
            </div>

            <div className="flex-shrink-0 md:w-1/2 flex justify-center items-center bg-blue-950 opacity-75">
              <video
                className="w-full h-full object-cover"
                src={`${import.meta.env.BASE_URL}presentation.mp4`}
                poster={`${import.meta.env.BASE_URL}presentation.png`}
                muted
                autoPlay
                loop
                playsInline
                onError={(e) => {
                  console.error("Video failed to load", e); // Manejo de errores
                  e.target.style.display = 'none';
                }}
              >Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/*Mision & Vision*/}
        <div className=" border border-gray-300">
          <div className="container gap-10 flex flex-col md:flex-row justify-center md:items-center mx-auto px-4 lg:px-20">

            <div className="md:w-2/3 pt-10 md:py-10">
              <h2 className="font-bold md:text-xl">CONSULTING</h2><br />
              <p className="text-xs md:text-lg">- Projects Structuring</p>
              <p className="text-xs md:text-lg">- Evaluation and Valuation of companies and projects</p>
              <p className="text-xs md:text-lg">- Networking, Startups and angel investors</p>
            </div>

            {/* Barra divisoria */}
            <div className="hidden md:block h-40 w-[2px] bg-blue-900"></div>

            <div className="md:w-2/3 pb-10 md:py-10">
              <h2 className="font-bold md:text-xl">SUSTAINABILITY PROJECTS</h2> <br />
              <p className="text-xs md:text-lg">- Implementation, support and management</p>
              <p className="text-xs md:text-lg">- Promotion and marketing for fundraising</p>
              <p className="text-xs md:text-lg">- Strategic Partnerships</p>
            </div>

          </div>
        </div>
      </div>

      {/* Prefooter Section */}
      <div
        className="w-full text-left mt-16 p-4 md:p-8 bg-repeat bg-center min-h-[350px]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(255, 255, 255), rgba(183, 202, 253, 0.842)),
            url('${import.meta.env.BASE_URL}banner.webp.jpg')`,
          backgroundSize: 'cover', // Ajusta el tamaño de fondo para cubrir el contenedor
          backgroundRepeat: 'no-repeat', // Evita la repetición vertical y horizontal
          backgroundPosition: 'center center' // Centra la imagen
        }}
      >
        <div className="px-4 md:px-8 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="flex items-center justify-center">
              <img className="h-48 md:h-64" src={`${import.meta.env.BASE_URL}logo_giic_big.svg`} alt="Logo" />
            </div>
            {/* <div className="flex items-center justify-left m-6">
              <div className="flex flex-col space-y-3 text-left">
                <h5 className="text-xs md:text-sm lg:text-lg font-bold">Services</h5> <br />
                <p className="text-xs md:text-lg ">- Financial Consulting</p>
                <p className="text-xs md:text-lg ">- Investments</p>
                <p className="text-xs md:text-lg ">- Sustainable Development Goals Projects (SDG)</p>
              </div>
            </div> */}
            <div className="flex items-center justify-left m-6">
              <div className="flex flex-col space-y-3 text-left">
                <h5 className="text-xs md:text-lg lg:text-lg font-bold">Contact Us</h5> <br />
                <p className="text-xs md:text-lg ">
                  Address: Intershore Chambers, Road Town, Tortola <br />
                  British Virgin Islands
                </p>
                <a
                  href="mailto:director@grandeileinternational.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs md:text-sm"
                >
                  <EnvelopeIcon className="w-4 h-4 " /> {/* Ícono de Heroicons v2 */}
                  <span className="text-xs md:text-lg">director@grandeileinternational.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black text-white text-xs bottom-0 w-full text-center py-1">
        <p>&copy; 2024 Grande Ile International Corporation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomaPage;
