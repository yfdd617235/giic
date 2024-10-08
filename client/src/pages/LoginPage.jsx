import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; // Importar el ícono de carga

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
    <div className='m-3 flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='max-w-md w-full p-10 rounded-md border border-zinc-500'>
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
            className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
            placeholder='Email'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          <input
            type='password'
            {...register("password", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md'
            placeholder='Password'
          />
          {errors.password && <p className='text-red-500'>Password is required</p>}

          <div className='flex justify-between'>
            <button
              type='submit'
              className='flex items-center justify-center text-green-500 px-3 py-1 my-3 rounded-sm border border-zinc-800'
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5 text-green-500" />
              ) : (
                "Login"
              )}
            </button>
            <Link
              to="/"
              className='px-3 py-1 my-3 rounded-sm border border-zinc-800'
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
