import { useEffect } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline"
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
      </div>

      {/* Cards Section */}
      <div className="container mx-auto my-8 px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Card 1 */}
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
                <p className="text-xs md:text-sm">- Projects Structuring</p>
                <p className="text-xs md:text-sm">- Evaluation and Valuation of companies and projects</p>
                <p className="text-xs md:text-sm">- Networking, Startups and angel investors</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
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
            <div className="flex items-center justify-left m-6">
              <div className="flex flex-col space-y-3 text-left">
                <h5 className="text-xs md:text-sm lg:text-lg font-bold">Services</h5> <br />
                <p className="text-xs md:text-sm ">- Financial Consulting</p>
                <p className="text-xs md:text-sm ">- Investments</p>
                <p className="text-xs md:text-sm ">- Sustainable Development Goals Projects (SDG)</p>
              </div>
            </div>
            <div className="flex items-center justify-left m-6">
              <div className="flex flex-col space-y-3 text-left">
                <h5 className="text-xs md:text-sm lg:text-lg font-bold">Contact Us</h5> <br />
                <p className="text-xs md:text-sm ">
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
                  <span>director@grandeileinternational.com</span>
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
