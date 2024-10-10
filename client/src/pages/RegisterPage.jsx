import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado de loading

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setLoading(false); // Detener el loading si el usuario está autenticado
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate]);

  // const onSubmit = handleSubmit(async (values) => {
  //   setLoading(true); // Iniciar el estado de loading cuando el usuario se registre
  //   signup(values);
  // });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true); // Iniciar el estado de loading cuando el usuario se registre
    await signup(values); // Realiza el signup
    setLoading(false); // Detiene el estado de loading
    navigate('/'); // Redirige al usuario a la página de inicio
  });

  return (
    <div className=' flex h-[calc(100vh-100px)] items-center justify-center' style={{
      backgroundImage: `
      linear-gradient(rgba(183, 202, 253, 0.842), rgba(255, 255, 255)),
      url('${import.meta.env.BASE_URL}banner.webp.jpg')`,
      backgroundSize: 'cover', // Ajusta el tamaño de fondo para cubrir el contenedor
      backgroundRepeat: 'no-repeat', // Evita la repetición vertical y horizontal
      backgroundPosition: 'center center' // Centra la imagen
    }}>
      <div className='bg-white bg-opacity-35 max-w-md w-full p-10 rounded-md shadow-lg'>
        {
          registerErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
              {error}
            </div>
          ))
        }
        <h1 className='text-xl font-bold my-2'>Register</h1>

        <form onSubmit={onSubmit}>
          <input 
            type='text' 
            {...register("username", { required: true })} 
            className='w-full px-4 py-2 my-2 rounded-md' 
            placeholder='Username' 
          />
          {errors.username && <p className='text-red-500'>Username is required</p>}

          <input 
            type='email' 
            {...register("email", { required: true })} 
            className='w-full px-4 py-2 my-2 rounded-md' 
            placeholder='Email' 
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          <input 
            type='password' 
            {...register("password", { required: true })} 
            className='w-full px-4 py-2 my-2 rounded-md' 
            placeholder='Password' 
          />
          {errors.password && <p className='text-red-500'>Password is required</p>}

          <button 
            type='submit' 
            className='flex items-center justify-center text-white px-3 py-1 my-3 rounded-sm'
            style={{
              backgroundColor: "#131921",
            }}>
            {loading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5 text-sky-500" />
              ) : (
                "Register"
              )}
          </button>

          <button
              type='submit'
              className='flex items-center justify-center text-white px-3 py-1 my-3 rounded-sm'
              style={{
                backgroundColor: "#131921",
              }}
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5 text-sky-500" />
              ) : (
                "Register"
              )}
            </button>
        </form>

        {/* <p className='flex gap-x-2 justify-between'>
          Already have an account?{" "} 
          <Link to="/login" className='text-sky-500'>Login</Link>
        </p> */}
      </div>
    </div>
  );
}

export default RegisterPage;

