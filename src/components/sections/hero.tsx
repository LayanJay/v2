import { Eye } from 'lucide-react';
import Link from 'next/link';
import { AuroraBackground } from '../ui/aurora-background';
import MovingBorderButton from '../ui/moving-border-button';
import { TextGenerateEffect } from '../ui/text-generate-effect';

const Hero = () => {
  return (
    <AuroraBackground className='w-screen h-[80vh]'>
      <div className='pb-20 pt-36'>
        <div className='relative z-10 flex justify-center my-20'>
          <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
            <p className='text-xs tracking-widest text-center text-blue-100 uppercase max-w-80'>
              Dynamic Web Magic with Next.js
            </p>

            <TextGenerateEffect
              words='Empowering Excellence in Software Development'
              className='text-center text-[40px] md:text-5xl lg:text-6xl'
            />

            <p className='mb-4 text-sm text-center md:tracking-wider md:text-lg lg:text-2xl'>
              Hi! I&apos;m Layan, a Full Stack Developer based in Sri Lanka.
            </p>

            <Link href='#about'>
              <MovingBorderButton
                title='See my work'
                icon={<Eye className='w-5 h-5' />}
                position='right'
              />
            </Link>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Hero;
