// import { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { useTasks } from '../context/TasksContext';
// import { useAuth } from '../context/AuthContext';
// import { projectList } from '../projects'; // Lista de proyectos
// import Select from 'react-select';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
// import { ArrowPathIcon } from '@heroicons/react/24/outline';

// // Registrar los componentes necesarios de Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// function BarChart() {
//   const { tasks, getTasks } = useTasks();
//   const { user } = useAuth();
//   const [selectedProjects, setSelectedProjects] = useState([]);
//   const [selectedUsernames, setSelectedUsernames] = useState([]);
//   const [usernamesOptions, setUsernamesOptions] = useState([]);
//   const [loading, setLoading] = useState(true); // Estado de loading

//   useEffect(() => {
//     async function fetchTasks() {
//         await getTasks();
//         setLoading(false); // Detener el loading cuando las tareas están listas
//         console.log("tasks", tasks)
//     }
//     fetchTasks(); // Obtener las tareas
// }, [getTasks]);

//   useEffect(() => {
//     if (user?.email === 'panamerican.pi@gmail.com') {
//       // Filtrar los nombres de usuario únicos para el filtro de username
//       const usernames = [...new Set(tasks.map(task => task.username))];
//       setUsernamesOptions(usernames);
//     }
//   }, [tasks, user]);

//   // Filtrar tareas basadas en el email del usuario
//   const filteredTasks = user?.email === 'panamerican.pi@gmail.com'
//     ? tasks.filter(task => selectedUsernames.length === 0 || selectedUsernames.includes(task.username))
//     : tasks.filter(task => task.user.email === user.email);

//   // Calcula el progreso por proyecto
//   const calculateProgress = (projects) => {
//     return projects.map((projectId) => {
//       const projectTasks = filteredTasks.filter(task => task.projectId === projectId); // Tareas del proyecto
//       const acceptedTasks = projectTasks.filter(task => task.status === 'Accepted'); // Tareas con estado 'Accepted'

//       // Verificar si el usuario no es 'panamerican.pi@gmail.com' o si se seleccionó algún usuario específico
//       const totalAcceptedTasks = (user?.email !== 'panamerican.pi@gmail.com' || selectedUsernames.length > 0)
//         ? 5  // Total para otros usuarios o si se selecciona un usuario específico
//         : 89; // Total para 'panamerican.pi@gmail.com'

//       // Calcula el porcentaje de avance
//       const progress = (acceptedTasks.length / totalAcceptedTasks) * 100;
//       return progress > 100 ? 100 : progress; // Asegúrate de que no pase del 100%
//     });
//   };

//   // Filtrar los proyectos seleccionados
//   const progressData = calculateProgress(selectedProjects);

//   // Calcula el progreso total promedio
//   const averageProgress = progressData.length > 0 
//     ? (progressData.reduce((total, progress) => total + progress, 0) / progressData.length).toFixed(2)
//     : 0;

//   // Datos para el gráfico
//   const data = {
//     labels: selectedProjects,
//     datasets: [
//       {
//         label: 'Project Progress (%)',
//         data: progressData, // Avance por proyecto
//         backgroundColor: 'rgba(34, 197, 94, 0.3)', // Verde transparente (opacidad 0.3)
//         borderColor: 'rgba(34, 197, 94, 1)', // Verde sólido para el borde
//         borderWidth: 2,
//       },
//     ],
//   };

//   // Opciones para el gráfico
// const options = {
//   scales: {
//     x: {
//       beginAtZero: true,
//       title: {
//         display: true,
//         text: 'Project',
//         color: '#A9A9A9', // Color blanco para el título del eje X
//       },
//       ticks: {
//         color: '#A9A9A9', // Color blanco para las etiquetas del eje X
//       },
//     },
//     y: {
//       beginAtZero: true,
//       suggestedMax: 100, // El máximo progreso es 100%
//       title: {
//         display: true,
//         text: 'Progress (%)',
//         color: '#A9A9A9', // Color blanco para el título del eje Y
//       },
//       ticks: {
//         stepSize: 10, // Ajustar el tamaño del paso de las marcas
//         color: '#A9A9A9', // Color blanco para las etiquetas del eje Y
//       },
//     },
//   },
//   plugins: {
//     legend: {
//       display: true,
//       position: 'top',
//       labels: {
//         color: '#ffffff', // Color blanco para el texto de la leyenda
//       },
//     },
//     tooltip: {
//       backgroundColor: '#333333', // Fondo oscuro del tooltip
//       titleColor: '#ffffff', // Color blanco para el título del tooltip
//       bodyColor: '#ffffff', // Color blanco para el cuerpo del tooltip (texto principal)
//       callbacks: {
//         label: function (tooltipItem) {
//           return `${tooltipItem.label}: ${tooltipItem.raw}%`;
//         },
//       },
//     },
//   },
// };


//   // Opciones para react-select de proyectos
//   const projectOptions = projectList.map(projectId => ({
//     value: projectId,
//     label: projectId,
//   }));

//   // Opciones para react-select de usernames (solo si el usuario es admin)
//   const usernameOptions = usernamesOptions.map(username => ({
//     value: username,
//     label: username,
//   }));

//   // Estilos para el componente Select
//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: 'black',
//       border: '1px solid gray',
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: 'black',
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected ? 'gray' : state.isFocused ? 'darkgray' : 'black',
//       color: 'white',
//     }),
//     singleValue: (provided) => ({
//       ...provided,
//       color: 'white',
//     }),
//     placeholder: (provided) => ({
//       ...provided,
//       color: 'white',
//     }),
//     indicatorSeparator: (provided) => ({
//       ...provided,
//       backgroundColor: 'white',
//     }),
//     dropdownIndicator: (provided) => ({
//       ...provided,
//       color: 'white',
//     }),
//   };

//   if (loading) return (
//     <div className="flex">
//       <ArrowPathIcon className="animate-spin h-5 w-5" /> {/* Indicador de carga */}
//       <span className="ml-2">Loading tasks...</span>
//     </div>
//   );

//   return (
//     <div className="p-4">
//       <h2 className="text-center font-bold mb-4">Total Average Progress: {averageProgress}%</h2>
      
//       {/* Filtro de proyectos */}
//       <Select
//         isMulti
//         options={projectOptions}
//         value={selectedProjects.map(project => ({ value: project, label: project }))}
//         onChange={(selected) => setSelectedProjects(selected.map(option => option.value))}
//         className="mb-4 text-xs text-black print:hidden"
//         classNamePrefix="custom-select"
//         placeholder="Select Projects..."
//         styles={customStyles}
//       />

//       {/* Filtro de usernames (solo si el usuario es admin) */}
//       {user?.email === 'panamerican.pi@gmail.com' && (
//         <Select
//           isMulti
//           options={usernameOptions}
//           value={selectedUsernames.map(username => ({ value: username, label: username }))}
//           onChange={(selected) => setSelectedUsernames(selected.map(option => option.value))}
//           className="mb-4 text-xs text-black print:hidden"
//           classNamePrefix="custom-select"
//           placeholder="Select Usernames..."
//           styles={customStyles}
//         />
//       )}

//       <Bar data={data} options={options}/>
//     </div>
//   );
// }

// export default BarChart;

import { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTasks } from '../context/TasksContext';
import { useAuth } from '../context/AuthContext';
import { projectList } from '../projects'; 
import Select from 'react-select';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart() {
  const { tasks, getTasks } = useTasks();
  const { user } = useAuth();
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedUsernames, setSelectedUsernames] = useState([]);
  const [usernamesOptions, setUsernamesOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState([]);

  const fetchTasks = useCallback(async () => {
    await getTasks();
    setLoading(false);
    console.log(tasks)
  }, []);

  // Fetch tasks only once when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Set usernames options only if the user is an admin and tasks are loaded
    if (user?.email === 'panamerican.pi@gmail.com' && !loading) {
      const usernames = [...new Set(tasks.map(task => task.username))];
      setUsernamesOptions(usernames);
    }
  }, [tasks, user, loading]);

  const filteredTasks = user?.email === 'panamerican.pi@gmail.com'
    ? tasks.filter(task => selectedUsernames.length === 0 || selectedUsernames.includes(task.username))
    : tasks.filter(task => task.user.email === user.email);

  const calculateProgress = (projects) => {
    return projects.map((projectId) => {
      const projectTasks = filteredTasks.filter(task => task.projectId === projectId);
      const acceptedTasks = projectTasks.filter(task => task.status === 'Accepted');

      const totalAcceptedTasks = (user?.email !== 'panamerican.pi@gmail.com' || selectedUsernames.length > 0) ? 5 : 89;

      const progress = (acceptedTasks.length / totalAcceptedTasks) * 100;
      return Math.min(progress, 100); // Ensure progress doesn't exceed 100
    });
  };

  useEffect(() => {
    if (selectedProjects.length > 0) {
      const newProgressData = calculateProgress(selectedProjects);
      setProgressData(newProgressData);
    } else {
      setProgressData([]); // Reset progress data when no projects are selected
    }
  }, [tasks, selectedProjects]);

  const averageProgress = progressData.length > 0 
    ? (progressData.reduce((total, progress) => total + progress, 0) / progressData.length).toFixed(2)
    : 0;

  const data = {
    labels: selectedProjects,
    datasets: [
      {
        label: 'Project Progress (%)',
        data: progressData,
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Inicia la escala desde 0
        min: 0, // Valor mínimo
        max: 100, // Valor máximo
        ticks: {
          stepSize: 10, // Incremento de los ticks (puedes ajustarlo según lo necesites)
        },
      },
    },
  };

  const projectOptions = projectList.map(projectId => ({
    value: projectId,
    label: projectId,
  }));

  const usernameOptions = usernamesOptions.map(username => ({
    value: username,
    label: username,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'black', // Fondo negro
      color: 'white', // Color del texto en el control
      border: '1px solid white', // Borde blanco
      boxShadow: 'none', // Eliminar sombra
      '&:hover': {
        border: '1px solid white', // Borde blanco al pasar el mouse
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'black', // Fondo negro para opciones
      color: 'white', // Color del texto en las opciones
      '&:hover': {
        backgroundColor: 'gray', // Fondo al pasar el mouse
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', // Color del texto seleccionado
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo para valores seleccionados
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white', // Color del texto en valores seleccionados
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white', // Color del icono de eliminar
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo al pasar el mouse
        color: 'white', // Asegúrate que el texto siga blanco al pasar el mouse
      },
    }),
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <ArrowPathIcon className="animate-spin h-5 w-5" />
      <span className="ml-2">Loading tasks...</span>
    </div>
  );

  return (
    <div>
  <h2 className="text-center font-bold mb-4">Total Average Progress: {averageProgress}%</h2>
  <Select
    isMulti
    options={projectOptions}
    value={selectedProjects.map((project) => ({ value: project, label: project }))}
    onChange={(selected) => setSelectedProjects(selected.map((option) => option.value))}
    className="mb-4 text-xs print:hidden"
    classNamePrefix="custom-select"
    placeholder="Select Projects..."
    styles={customStyles} // Asegúrate de aplicar los estilos personalizados aquí
  />
  {user?.email === 'panamerican.pi@gmail.com' && (
    <Select
      isMulti
      options={usernameOptions}
      value={selectedUsernames.map((username) => ({ value: username, label: username }))}
      onChange={(selected) => setSelectedUsernames(selected.map((option) => option.value))}
      className="mb-4 text-xs print:hidden"
      classNamePrefix="custom-select"
      placeholder="Select Usernames..."
      styles={customStyles} // Asegúrate de aplicar los estilos personalizados aquí
    />
  )}
  <Bar data={data} options={options}/>
</div>

  );
}

export default BarChart;
