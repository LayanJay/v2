'use client';

import animationData from '@/data/confetti.json';
import { cn } from '@/utils/tailwind-utils';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Lottie from 'react-lottie';
import BackgroundGradientAnimation from './background-gradient';
import MovingBorderButton from './moving-border-button';
import World3D from './world-3d';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        'grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  descriptionClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ['ReactJS', 'NextJS', 'Typescript'];
  const rightLists = ['NodeJS', 'Express', 'NestJS'];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleCopy = () => {
    const text = 'layanjayasinghe2@gmail.com';
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        'row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4',
        className,
      )}
      style={{
        background: 'rgb(4,7,29)',
        backgroundColor: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
      }}
    >
      <div className={`${id === 6 && 'flex justify-center'} h-full`}>
        {/* for the github 3d globe */}
        {id === 1 && <World3D />}

        {id === 2 ? <div className='absolute inset-0 z-10 bg-black-100/50' /> : null}
        <div className='absolute w-full h-full'>
          {img && (
            <Image src={img} alt={img} className={cn(imgClassName, 'object-cover object-center')} />
          )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'} `}>
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              width={220}
              height={220}
              className='object-cover object-center w-full h-full'
            />
          )}
        </div>
        {id === 6 && (
          // add background animation , remove the p tag
          <BackgroundGradientAnimation>
            <div className='absolute inset-0 z-50 flex items-center justify-center px-4 text-3xl font-bold text-center text-white pointer-events-none md:text-4xl lg:text-7xl'></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-20',
            titleClassName,
          )}
        >
          <div
            className={cn(
              'font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10',
              descriptionClassName,
            )}
          >
            {description}
          </div>

          <div className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}>{title}</div>

          {id === 3 && (
            <div className='absolute flex gap-1 lg:gap-5 w-fit -right-3 lg:-right-2'>
              {/* tech stack lists */}
              <div className='flex flex-col gap-3 md:gap-3 lg:gap-8'>
                {leftLists.map((item) => (
                  <span
                    key={item}
                    className='lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]'
                  >
                    {item}
                  </span>
                ))}
                <span className='lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]'></span>
              </div>
              <div className='flex flex-col gap-3 md:gap-3 lg:gap-8'>
                <span className='lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]'></span>
                {rightLists.map((item) => (
                  <span
                    key={item}
                    className='lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className='relative mt-5'>
              <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 block`}>
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MovingBorderButton
                title={copied ? 'Email is copied!' : 'Copy my email'}
                icon={<Copy className='w-5 h-6' />}
                position='left'
                handleClick={handleCopy}
                otherClasses='!bg-[#161A31] whitespace-nowrap'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
