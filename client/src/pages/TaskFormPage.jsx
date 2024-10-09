import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { ArrowPathIcon } from '@heroicons/react/24/outline'; // Importar el ícono de carga
dayjs.extend(utc);

// Importa la lista de proyectos
import { projectList } from '../projects';

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const { user } = useAuth(); // Obtén la información del usuario autenticado
  const navigate = useNavigate();
  const params = useParams();
  const [selectedProject, setSelectedProject] = useState('');
  const [loading, setLoading] = useState(false); // Estado de loading
  const [status, setStatus] = useState('Sent'); // Estado para manejar el status

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue('title', task.title);
        setValue('description', task.description);
        setSelectedProject(task.projectId || ''); // Cargar el proyecto actual
        setStatus(task.status || 'Sent'); // Cargar el status actual de la tarea
      }
    }
    loadTask();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true); // Iniciar el estado de loading cuando el formulario se envíe

    // Creamos FormData
    const formData = new FormData();

    // Agregamos el resto de los datos
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('date', data.date ? dayjs.utc(data.date).format() : dayjs.utc().format());

    formData.append('projectId', selectedProject || task.projectId); // Agregar el proyecto seleccionado
    formData.append('status', status); // Añadir el estado de la tarea

    // Añadir username y email del usuario autenticado
    formData.append('username', user.username);
    formData.append('email', user.email);

    // Agregamos el archivo si existe
    if (data.file[0]) {
      formData.append('file', data.file[0]);
    }

    try {
      if (params.id) {
        await updateTask(params.id, formData);
      } else {
        await createTask(formData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Detener el estado de loading después de que la tarea se haya creado o actualizado
      navigate('/tasktable');
    }
  });

  return (
    <div className='flex h-screen w-full items-center justify-center pt-32 lg:pt-0'
      style={{
        backgroundImage: `
    linear-gradient(rgba(183, 202, 253, 0.842), rgba(255, 255, 255)),
    url('${import.meta.env.BASE_URL}banner.webp.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }}>

      <div className='flex flex-col lg:flex-row gap-5 bg-blue-950 bg-opacity-15 w-full xl:w-3/4 lg:w-3/4 p-2 md:p-10 rounded-md shadow-md mt-20'>

        {/* Columna izquierda para las instrucciones de pago */}
        <div className='flex flex-col justify-center items-center lg:w-1/2 w-full'>
          <div className=" rounded-lg">
            <h1 className="text-lg md:text-xl font-bold mb-2">Payment Instructions</h1>
            <p className="mb-1">1. <strong>Scan the QR Code</strong>.</p>
            <p className="mb-1">2. <strong>Send Tether (USDT)</strong> via the <strong>TRON (TRC20)</strong> network.</p>
            <p className="mb-1">3. <strong>Take a screenshot</strong> of the payment confirmation.</p>
            <p className="mb-1">4. <strong>Fill in your name</strong> and <strong>contract title</strong>.</p>
            <p className="mb-1">5. <strong>Upload the screenshot</strong> and <strong>submit</strong> the form.</p>
          </div>
          <div className="h-40 w-40 lg:h-60 lg:w-60 overflow-hidden pt-2 flex flex-col items-center">
            <img
              src={`${import.meta.env.BASE_URL}trustwalletYosef.jpeg`}
              alt="GIIC"
              className="h-full w-full object-cover object-center"
            />
            
          </div>
          <p className="text-center text-blue-800 font-bold mt-2">TCQsi5diGvf2Utp2ekHwzx2ShuviU1dow3</p>
        </div>

        {/* Columna derecha para el formulario de pago */}
        <div className='lg:w-1/2 w-full'>
          <h1 className='text-lg md:text-xl font-bold'>Perform Payment</h1>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <input
              type="text"
              placeholder='Title'
              {...register('title')}
              className='w-full px-4 py-2 rounded-md my-2'
              autoFocus
            />
            <textarea
              rows="3"
              placeholder='Description'
              {...register('description')}
              className='w-full px-4 py-2 rounded-md my-2'
            ></textarea>
            <input
              type="file"
              {...register('file')}
              className='w-full bg-white px-4 py-2 rounded-md my-2'
            />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className='w-full px-4 py-2 rounded-md my-2'
            >
              <option value="">Select Project</option>
              {projectList.map((projectId, index) => (
                <option key={index} value={projectId}>
                  {projectId}
                </option>
              ))}
            </select>

            {/* Mostrar el campo de status solo si el usuario es "panamerican.pi@gmail.com" */}
            {user.email === 'panamerican.pi@gmail.com' && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className='w-full px-4 py-2 rounded-md my-2'
              >
                <option value="Sent">Sent</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            )}

            <div className='flex justify-between'>
              <button
                type='submit'
                className='bg-black flex items-center justify-center text-white px-3 py-1 my-3 rounded-sm'
                style={{ backgroundColor: "#131921" }}
              >
                {loading ? (
                  <ArrowPathIcon className="animate-spin h-5 w-5 text-sky-500" />
                ) : (
                  "Submit"
                )}
              </button>
              <Link to="/tasktable" className='px-3 py-1 my-3 rounded-sm'>
                Cancel
              </Link>
            </div>
          </form>
        </div>

      </div>

    </div>

  );
}

export default TaskFormPage;

