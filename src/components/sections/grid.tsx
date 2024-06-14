import { gridItems } from '@/data';
import dynamic from 'next/dynamic';
import BentoGrid from '../ui/bento-grid';

const BentoGridItem = dynamic(() => import('../ui/bento-grid-item'), { ssr: false });

const Grid = () => {
  return (
    <section id='about' className='w-full max-w-7xl'>
      <BentoGrid className='w-full py-20'>
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            descriptionClassName={item.descriptionClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
