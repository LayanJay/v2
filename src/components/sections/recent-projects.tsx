import { projects } from '@/data';
import { HoverEffect } from '../ui/card-hover-effect';

const RecentProjects = () => {
  return (
    <div id='projects' className='py-20'>
      <h1 className='heading'>
        Highlighted <span className='text-purple'>Recent Work</span>
      </h1>
      <HoverEffect items={projects} className='mt-10' />
    </div>
  );
};

export default RecentProjects;
