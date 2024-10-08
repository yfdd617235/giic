import { useEffect } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid"
import { wakeUpServer } from '../api/axios'; // Importa la función wakeUpServer

const HomaPage = () => {

  useEffect(() => {
    // Llamada para despertar el servidor cuando la página cargue
    wakeUpServer();
  }, []); // Solo se ejecuta una vez al montar el componente


  return (
    <div className="flex flex-col pt-10">
      {/* Jumbotron Section */}
      <div
        className="h-screen w-full bg-center flex justify-center items-center"
        style={{
          backgroundImage: `
            linear-gradient(to top, transparent, black),
            linear-gradient(to bottom, transparent, black),
            linear-gradient(to bottom, transparent, black),
            url('${import.meta.env.BASE_URL}banner.webp')`,
          backgroundSize: 'cover', // Ajusta el tamaño de fondo para cubrir el contenedor
          backgroundRepeat: 'no-repeat', // Evita la repetición vertical y horizontal
          backgroundPosition: 'center center' // Centra la imagen
        }}
      >
        <img
          className="max-w-full max-h-full lg:p-32"
          src={`${import.meta.env.BASE_URL}logoT.png`}
          alt="Logo"
        />
      </div>

      {/* Cards Section */}
      <div className="container mx-auto my-8 px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Card 1 */}
          <div className="h-full shadow-md border border-zinc-600 rounded-lg">
            <img
              src={`${import.meta.env.BASE_URL}global.jpg`}
              alt="Project 1"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4 md:p-6">
              <h5 className="text-base md:text-xl font-semibold">CONSULTING</h5>
              <br />
              <div className="flex flex-col space-y-3 text-left">
                <p className="text-xs md:text-sm">- Projects Structuring</p>
                <p className="text-xs md:text-sm">- Evaluation and Valuation of companies and projects</p>
                <p className="text-xs md:text-sm">- Networking, Startups and angel investors</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="h-full shadow-md border border-zinc-600 rounded-lg">
            <img
              src={`${import.meta.env.BASE_URL}lightbulb.jpg`}
              alt="Project 2"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4 md:p-6">
              <h5 className="text-base md:text-xl font-semibold">SOFTWARE DEVELOPMENT</h5>
              <br />
              <div className="flex flex-col space-y-3 text-left">
                <p className="text-xs md:text-sm">- Leverage for Environmental Investments</p>
                <p className="text-xs md:text-sm">- Financial arbitraje with licensed entities</p>
                <p className="text-xs md:text-sm">- International Commerce (Food and other commodities)</p>
                <p className="text-xs md:text-sm">- Algorithmic trading and market analysis Software</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
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
                <p className="text-xs md:text-sm">- Structuring</p>
                <p className="text-xs md:text-sm">- Implementation, support and management</p>
                <p className="text-xs md:text-sm">- Promotion and marketing for fundraising</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prefooter Section */}
      <div
        className="w-full text-left mt-16 p-4 md:p-8 bg-repeat bg-center min-h-[400px]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, transparent, black),
            linear-gradient(to top, transparent, black),
            linear-gradient(to top, transparent, black),
            url('${import.meta.env.BASE_URL}banner.webp')`,
          backgroundSize: 'cover', // Ajusta el tamaño de fondo para cubrir el contenedor
          backgroundRepeat: 'no-repeat', // Evita la repetición vertical y horizontal
          backgroundPosition: 'center center' // Centra la imagen
        }}
      >
        <div className="px-4 md:px-8 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="flex items-center justify-center">
              <img className="h-48 md:h-64" src={`${import.meta.env.BASE_URL}logoT.png`} alt="Logo" />
            </div>
            <div className="flex items-center justify-left m-6">
              <div className="flex flex-col space-y-3 text-left">
                <h5 className="text-xs md:text-sm lg:text-lg font-bold">Services</h5> <br />
                <p className="text-xs md:text-sm ">- Trading and financial investments</p>
                <p className="text-xs md:text-sm ">- Project evaluation, structuring and management</p>
                <p className="text-xs md:text-sm ">- International business consulting</p>
                <p className="text-xs md:text-sm ">- Software and Artificial Intelligence development</p>
              </div>
            </div>
            <div className="flex items-center justify-left m-6">
              <div className="flex flex-col space-y-3 text-left">
                <h5 className="text-xs md:text-sm lg:text-lg font-bold">Contact Us</h5> <br />
                <p className="text-xs md:text-sm ">
                  Address: Cra 42 C #3 Sur 81, Torre 1, Piso 15 <br />
                  CE Milla de Oro, Medellín Colombia
                </p>
                <a
                  href="mailto:panamerican.pi@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs md:text-sm"
                >
                  <EnvelopeIcon className="w-4 h-4 text-white" /> {/* Ícono de Heroicons v2 */}
                  <span>panamerican.pi@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black text-white text-xs bottom-0 w-full text-center py-1">
        <p>&copy; 2024 Panamerican Private Investments. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomaPage;
