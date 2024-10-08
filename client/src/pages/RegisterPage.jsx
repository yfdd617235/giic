import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className='m-3 flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='max-w-md p-10 rounded-md border border-zinc-500'>
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
            className='w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md' 
            placeholder='Username' 
          />
          {errors.username && <p className='text-red-500'>Username is required</p>}

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

          <button 
            type='submit' 
            className='text-green-500 px-3 py-1 my-3 rounded-sm border border-zinc-800'
          >
            {loading ? "Registering..." : "Register"} {/* Muestra "loading" mientras se registra */}
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

