import { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTasks } from '../context/TasksContext';
import { useAuth } from '../context/AuthContext';
import { projectList, ADMIN } from '../projects'; 
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
    if (user?.email === ADMIN && !loading) {
      const usernames = [...new Set(tasks.map(task => task.username))];
      setUsernamesOptions(usernames);
    }
  }, [tasks, user, loading]);

  const filteredTasks = user?.email === ADMIN
    ? tasks.filter(task => selectedUsernames.length === 0 || selectedUsernames.includes(task.username))
    : tasks.filter(task => task.user.email === user.email);

  const calculateProgress = (projects) => {
    return projects.map((projectId) => {
      const projectTasks = filteredTasks.filter(task => task.projectId === projectId);
      const acceptedTasks = projectTasks.filter(task => task.status === 'Accepted');

      const totalAcceptedTasks = (user?.email !== ADMIN || selectedUsernames.length > 0) ? 5 : 89;

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
  {user?.email === ADMIN && (
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
