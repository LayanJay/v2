import { workExperience } from '@/data';
import Image from 'next/image';
import MovingBorderCard from '../ui/moving-border-card';

const Experience = () => {
  return (
    <div id='experience' className='w-full py-20 max-w-7xl'>
      <h1 className='heading'>
        My <span className='text-purple'>Work Experience</span>
      </h1>

      <div className='grid w-full grid-cols-1 gap-10 mt-12 lg:grid-cols-4'>
        {workExperience.map((card) => (
          <MovingBorderCard
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius='1.75rem'
            style={{
              background: 'rgb(4,7,29)',
              backgroundColor: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className='flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800'
          >
            <div className='flex flex-col gap-2 p-3 py-6 lg:flex-row lg:items-center md:p-5 lg:p-10'>
              <Image src={card.thumbnail} alt={card.thumbnail} className='w-16 lg:w-32 md:w-20' />
              <div className='lg:ms-5'>
                <h1 className='text-xl font-bold text-start md:text-2xl'>{card.title}</h1>
                <p className='font-semibold text-purple'>{card.company}</p>
                <p className='mt-3 text-start text-white-100 line-clamp-5'>{card.description}</p>
              </div>
            </div>
          </MovingBorderCard>
        ))}
      </div>
    </div>
  );
};

export default Experience;
