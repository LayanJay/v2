'use client';

import { cn } from '@/utils/tailwind-utils';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useRef } from 'react';

type Props = {
  children: ReactNode;
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  style: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>['style'];
};

const MovingBorderCard = ({
  borderRadius = '1.75rem',
  children,
  containerClassName,
  borderClassName,
  duration,
  className,
  style,
}: Props) => {
  return (
    <div
      className={cn(
        'bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2 md:row-span-1',
        containerClassName,
      )}
      style={style}
    >
      <div
        className='absolute inset-0 rounded-[1.75rem]'
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx='22%' ry='22%'>
          <div
            className={cn(
              'h-20 w-20 opacity-[0.8] bg-[radial-gradient(#CBACF9_40%,transparent_60%)]',
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          'relative bg-slate-900/[0.] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased',
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
}: {
  children: ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
        className='absolute w-full h-full'
        width='100%'
        height='100%'
      >
        <rect fill='none' width='100%' height='100%' rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default MovingBorderCard;
