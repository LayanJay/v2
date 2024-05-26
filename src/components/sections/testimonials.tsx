import { testimonials } from '@/data';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

const Testimonials = () => {
  return (
    <section id='testimonials' className='py-20 max-w-7xl'>
      <h1 className='heading capitalize'>
        <span className='text-purple'>Words</span> from Those I&apos;ve Worked With
      </h1>

      <div className='flex flex-col items-center max-lg:mt-10'>
        <div className='h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden'>
          <InfiniteMovingCards items={testimonials} direction='right' speed='slow' />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
