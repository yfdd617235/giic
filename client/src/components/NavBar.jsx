import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRightOnRectangleIcon,
  ListBulletIcon,
  CurrencyDollarIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  Bars3Icon,
  CreditCardIcon
} from "@heroicons/react/24/outline";
import {ADMIN} from "../projects"

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
//left-1/2 transform -translate-x-1/2
  return (
    <nav
      className={`bg-black fixed z-50 w-screen print:hidden`}
      style={{
        backgroundColor: "#131921",
      }}
    >
      <div className="m-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="h-10 w-10 overflow-hidden pt-2">
              <img
                src={`${import.meta.env.BASE_URL}logo_giic_small.svg`}
                alt="GIIC"
                className="h-full w-full object-cover object-center scale-150"
              />
            </div>
          </Link>
          <div className="text-white hidden md:block">
            <h1>Grande Ile International Corporation</h1>
          </div>
        </div>

        <div className="flex items-center">
          {isAuthenticated && (
            <div className="text-sm text-sky-200 flex items-center flex-grow md:flex-grow-0 mx-4">
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
                    to="/add-task"
                    className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-500"
                  >
                    <CreditCardIcon className="h-5 w-5 text-white" />
                    <span className="sr-only">Tasks</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-2 py-1 sm:px-2 sm:py-1 rounded-sm text-sm sm:text-base border border-zinc-500"
                  >
                    <ListBulletIcon className="h-5 w-5 text-white" />
                    <span className="sr-only">TaskTable</span>
                  </Link>
                </li>
                {user.email === ADMIN && (
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
                      to="/add-task"
                      className="bg-black flex items-center gap-2 px-2 py-1 rounded-sm text-sm border border-zinc-700"
                      onClick={closeMenu} // Cerrar el menú al hacer clic en un enlace
                    >
                      <CreditCardIcon className="h-5 w-5 text-white" />
                      <span className="sr-only">Tasks</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="bg-black flex items-center gap-2 px-2 py-1 rounded-sm text-sm border border-zinc-700"
                      onClick={closeMenu} // Cerrar el menú al hacer clic en un enlace
                    >
                      <ListBulletIcon className="h-5 w-5 text-white" />
                      <span className="sr-only">Profile</span>
                    </Link>
                  </li>
                  {user.email === ADMIN && (
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

