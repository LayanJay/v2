'use client';

import { cn } from '@/utils/tailwind-utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { startTransition, useCallback, useState } from 'react';
import bg from '../../../public/assets/bg.png';

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: number;
    title: string;
    description: string;
    img: StaticImageData;
    iconLists: StaticImageData[];
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleTransition = useCallback((idx: number | null) => {
    startTransition(() => {
      setHoveredIndex(idx);
    });
  }, []);

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2', className)}>
      {items.map((item) => (
        <a
          key={item.id}
          {...(item.link ? { target: '_blank', href: item.link } : {})}
          className='relative block w-full h-full p-2 group'
          onMouseEnter={() => handleTransition(item.id)}
          onMouseLeave={() => handleTransition(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.span
                className='absolute inset-0 h-full w-full bg-neutral-200 dark:bg-purple/50 block  rounded-3xl'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardImage src={item.img} />
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <div className='mt-4 space-y-3'>
              <CardIconList iconLists={item.iconLists} />
              {item.link ? <CardLink /> : null}
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full sm:w-80 md:w-96 lg:w-full lg:max-w-md p-4 overflow-hidden bg-black-100 border border-transparent dark:border-white/[0.2] group-hover:border-black-300 relative z-20',
        className,
      )}
    >
      <div className='relative z-50'>
        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
};

export const CardImage = ({ src }: { src: StaticImageData }) => {
  return (
    <div className='relative flex items-center justify-center w-full overflow-hidden h-[28vh] lg:h-[32vh] mb-10'>
      <div
        className='relative w-full h-full overflow-hidden rounded-2xl'
        style={{ backgroundColor: '#13162D' }}
      >
        <Image src={bg} alt='bgImage' />
      </div>
      <Image src={src} alt='cover' className='absolute bottom-0 z-10' />
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn('font-bold lg:text-2xl md:text-xl text-base line-clamp-2', className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ children }: { children: React.ReactNode }) => {
  return (
    <p
      className='text-sm font-light lg:font-normal md:line-clamp-3'
      style={{
        color: '#BEC1DD',
        margin: '1vh 0',
      }}
    >
      {children}
    </p>
  );
};

export const CardIconList = ({ iconLists }: { iconLists: StaticImageData[] }) => {
  return (
    <div className='flex items-center'>
      {iconLists.map((icon, index) => (
        <div
          key={index}
          className='border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center'
          style={{
            transform: `translateX(-${5 * index + 2}px)`,
          }}
        >
          <Image src={icon} alt='icon5' className='p-1' />
        </div>
      ))}
    </div>
  );
};

export const CardLink = () => {
  return (
    <div className='flex items-center'>
      <p className='flex text-sm lg:text-base md:text-xs text-purple'>Check Live Site</p>
      <ExternalLink className='w-4 h-4 md:w-5 md:h-5 ms-3' color='#CBACF9' />
    </div>
  );
};
