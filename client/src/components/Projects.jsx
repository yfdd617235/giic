import { useState } from 'react';

const Projects = () => {

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <div className='text-yellow-500 mt-16'>
        This space will soon be the project control panel.
      </div>

      <div>
        <img
          src={`${import.meta.env.BASE_URL}Project_schedule.jpeg`}
          alt="PPI"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Projects;
