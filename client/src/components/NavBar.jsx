// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { ArrowRightOnRectangleIcon, ClipboardDocumentCheckIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';

// function NavBar() {
//   const [isVisible, setIsVisible] = useState(false);
//   const { isAuthenticated, logout, user } = useAuth();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <nav
//       className={`bg-black fixed top-0 left-1/2 transform -translate-x-1/2 w-full py-0 z-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
//     >
//       <div className="mx-3 flex items-center justify-between">
//         <div className="flex items-center">
//           <Link to={isAuthenticated ? "/" : "/"}>
//             <div className="h-14 w-14 m-2 overflow-hidden">
//               <img
//                 src={`${import.meta.env.BASE_URL}logoT.png`}
//                 alt="PPI"
//                 className="h-full w-full object-cover object-center scale-125"
//               />
//             </div>
//           </Link>
//         </div>

//         <ul className="flex flex-wrap gap-x-3 gap-y-2 md:gap-y-0 items-center">
//           {isAuthenticated ? (
//             <>
//               <li className="text-sm text-white">{user.username}</li>
//               <li>
//                 <Link
//                   to="/tasks"
//                   className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-800"
//                 >
//                   <ClipboardDocumentCheckIcon className="h-5 w-5 text-white" />
//                   <span className="sr-only">Tasks</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-800"
//                 >
//                   <UserCircleIcon className="h-5 w-5 text-green-600" />
//                   <span className="sr-only">Profile</span>
//                 </Link>
//               </li>
//               {user.email === "panamerican.pi@gmail.com" && (
//               /*{ {user.email === "admin@gmail.com" && ( }*/

//                 <li>
//                 <Link
//                   to="/register"
//                   className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm border border-zinc-800"
//                 >
//                   <UserPlusIcon className="h-5 w-5 text-gray-500"/>
//                   <span className="sr-only">Register</span>
//                 </Link>
//               </li>
//               )}
//               <li>
//                 <Link
//                   to="/"
//                   onClick={() => logout()}
//                   className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-800"
//                 >
//                   <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
//                   <span className="sr-only">Logout</span>
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link
//                   to="/login"
//                   className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-800"
//                 >
//                   <ArrowLeftOnRectangleIcon className="h-5 w-5 text-white" />
//                   <span className="sr-only">Login</span>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRightOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  ClipboardDocumentCheckIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";

function NavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`bg-black fixed top-0 left-1/2 transform -translate-x-1/2 w-full py-0 z-50 print:hidden`}
    >
      <div className="mr-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <div className="h-14 w-14 overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}logoT.png`}
                alt="PPI"
                className="h-full w-full object-cover object-center scale-125"
              />
            </div>
          </Link>
        </div>

        <div className="flex items-center">
          {isAuthenticated && (
            <div className="text-sm text-green-500 flex items-center flex-grow md:flex-grow-0 mx-4">
              {user.username}
            </div>
          )}

          {/* Mostrar el menú hamburguesa o el icono de login según el estado de autenticación */}
          {isAuthenticated ? (
            <button onClick={toggleMenu} className="text-white md:hidden">
              <Bars3Icon className="h-6 w-6" />
            </button>
          ) : (
            <Link to="/login" className="text-white md:hidden">
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            </Link>
          )}

          {/* Menú de navegación para pantallas grandes */}
          <ul className={`hidden md:flex flex-wrap gap-x-3 items-center ${!isAuthenticated ? 'justify-end' : ''}`}>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/tasks"
                    className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-500"
                  >
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-white" />
                    <span className="sr-only">Tasks</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-500"
                  >
                    <AdjustmentsHorizontalIcon className="h-5 w-5 text-green-500" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </li>
                {user.email === "panamerican.pi@gmail.com" && (
                  <li>
                    <Link
                      to="/register"
                      className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm border border-zinc-500"
                    >
                      <UserPlusIcon className="h-5 w-5 text-zinc-500" />
                      <span className="sr-only">Register</span>
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                      closeMenu(); // Cerrar el menú al hacer clic en Logout
                    }}
                    className="flex items-center gap-2 px-2 py-1 rounded-sm text-sm border border-zinc-500"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-700"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 text-white" />
                  <span className="sr-only">Login</span>
                </Link>
              </li>
            )}
          </ul>

          {/* Menú hamburguesa desplegable para pantallas pequeñas */}
          {isMenuOpen && (
            <ul className="absolute right-0 top-12 text-white rounded-md flex flex-col gap-3 md:hidden">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/tasks"
                      className="bg-black flex items-center gap-2 px-2 py-1 rounded-sm text-sm border border-zinc-700"
                      onClick={closeMenu} // Cerrar el menú al hacer clic en un enlace
                    >
                      <ClipboardDocumentCheckIcon className="h-5 w-5 text-white" />
                      <span className="sr-only">Tasks</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="bg-black flex items-center gap-2 px-2 py-1 rounded-sm text-sm border border-zinc-700"
                      onClick={closeMenu} // Cerrar el menú al hacer clic en un enlace
                    >
                      <AdjustmentsHorizontalIcon className="h-5 w-5 text-green-600" />
                      <span className="sr-only">Profile</span>
                    </Link>
                  </li>
                  {user.email === "panamerican.pi@gmail.com" && (
                    <li>
                      <Link
                        to="/register"
                        className="bg-black flex items-center gap-2 px-2 py-1 rounded-sm text-sm border border-zinc-700"
                        onClick={closeMenu} // Cerrar el menú al hacer clic en un enlace
                      >
                        <UserPlusIcon className="h-5 w-5 text-gray-500" />
                        <span className="sr-only">Register</span>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        logout();
                        closeMenu(); // Cerrar el menú al hacer clic en Logout
                      }}
                      className="bg-black flex items-center gap-2 px-2 py-1 rounded-sm text-sm border border-zinc-700"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
                      <span className="sr-only">Logout</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-2 py-1 rounded-sm text-sm border border-zinc-700"
                    onClick={closeMenu} // Cerrar el menú al hacer clic en un enlace
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 text-white" />
                    <span className="sr-only">Login</span>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

