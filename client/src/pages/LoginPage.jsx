import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

function LoginPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado de loading

  const onSubmit = handleSubmit((data) => {
    setLoading(true); // Inicia el loading cuando el usuario hace login
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false); // Detenemos el loading si se autentica
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='flex h-screen w-full items-center justify-center'
      style={{
        backgroundImage: `
        linear-gradient(rgba(183, 202, 253, 0.842), rgba(255, 255, 255)),
        url('${import.meta.env.BASE_URL}banner.webp.jpg')`,
        backgroundSize: 'cover', // Ajusta el tamaño de fondo para cubrir el contenedor
        backgroundRepeat: 'no-repeat', // Evita la repetición vertical y horizontal
        backgroundPosition: 'center center' // Centra la imagen
      }}>
      <div className='bg-white bg-opacity-35 max-w-md w-full p-10 rounded-md shadow-lg'>
        {
          signinErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
              {error}
            </div>
          ))
        }

        <h1 className='text-xl font-bold'>Login</h1>

        <form onSubmit={onSubmit}>
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

          <div className='flex justify-between'>
            <button
              type='submit'
              className='bg-black flex items-center justify-center text-white px-3 py-1 my-3 rounded-sm'
              style={{
                backgroundColor: "#131921",
              }}
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5 text-sky-500" />
              ) : (
                "Login"
              )}
            </button>
            <Link
              to="/"
              className='text-black px-3 py-1 my-3 rounded-sm'
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* <p className='flex gap-x-2 justify-between'>
          Don't have an account? <Link to="/register" className='text-sky-500'>Sign up</Link>
        </p> */}
      </div>
    </div>

  );
}

export default LoginPage;
