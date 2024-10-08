import { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTasks } from '../context/TasksContext';
import { useAuth } from '../context/AuthContext';
import { projectList } from '../projects'; 
import Select from 'react-select';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const { tasks, getTasks } = useTasks();
  const { user } = useAuth();
  const [selectedProjects, setSelectedProjects] = useState([]); // Proyectos seleccionados
  const [loading, setLoading] = useState(true);
  const [usernamesOptions, setUsernamesOptions] = useState([]);
  const [usernameTaskCounts, setUsernameTaskCounts] = useState([]);

  const fetchTasks = useCallback(async () => {
    await getTasks();
    setLoading(false);
    console.log(tasks)
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Actualizamos el estado con los usernames disponibles cuando se seleccionan proyectos
    if (selectedProjects.length > 0) {
      const filteredTasks = tasks.filter(task => selectedProjects.includes(task.projectId));
      const usernames = [...new Set(filteredTasks.map(task => task.username))];
      setUsernamesOptions(usernames);
    } else {
      setUsernamesOptions([]);
    }
  }, [tasks, selectedProjects]);

  useEffect(() => {
    // Si ya se han seleccionado proyectos y se han filtrado usernames, calculamos el número de tareas
    if (selectedProjects.length > 0) {
      const filteredTasks = tasks.filter(task => selectedProjects.includes(task.projectId));
      const counts = usernamesOptions.map(username => ({
        username,
        count: filteredTasks.filter(task => task.username === username).length,
      }));
      setUsernameTaskCounts(counts);
    } else {
      setUsernameTaskCounts([]);
    }
  }, [tasks, selectedProjects, usernamesOptions]);

  const data = {
    labels: usernameTaskCounts.map(item => item.username), // Lista de usernames
    datasets: [
      {
        label: 'Tasks per Username',
        data: usernameTaskCounts.map(item => item.count), // Cantidad de tareas por username
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Cambiamos para que las barras sean horizontales
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Incremento en la escala
        },
      },
    },
  };

  const projectOptions = projectList.map(projectId => ({
    value: projectId,
    label: projectId,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'black',
      color: 'white',
      border: '1px solid white',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid white',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'black',
      color: state.isSelected ? 'black' : 'white',
      '&:hover': {
        backgroundColor: 'gray',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
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
      <h2 className="text-center font-bold mb-4">Task Count by Username</h2>
      <Select
        isMulti
        options={projectOptions}
        value={selectedProjects.map((project) => ({ value: project, label: project }))}
        onChange={(selected) => setSelectedProjects(selected.map((option) => option.value))}
        className="mb-4 text-xs print:hidden"
        classNamePrefix="custom-select"
        placeholder="Select Projects..."
        styles={customStyles}
      />
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
