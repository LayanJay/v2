import { socialMedia } from '@/data';
import { SendHorizonal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MovingBorderButton from '../ui/moving-border-button';

const Footer = () => {
  return (
    <footer
      id='contact'
      className='relative overflow-hidden pt-20 pb-10 px-20 border-b-2 border-purple w-screen'
    >
      <div className='flex flex-col items-center'>
        <h1 className='heading lg:max-w-[45vw]'>
          Let&apos;s Get in <span className='text-purple'>Touch</span>
        </h1>
        <p className='text-white-200 md:mt-10 my-5 text-center max-w-2xl'>
          Have a question or want to discuss a project? I&apos;m just a message away. Let&apos;s
          connect and explore how we can work together to bring your ideas to life.
        </p>
        <a href='mailto:layanjayasinghe2@gmail.com'>
          <MovingBorderButton
            title='Contact Me Today'
            icon={<SendHorizonal className='w-4 h-4' />}
            position='right'
          />
        </a>
      </div>
      <div className='flex mt-16 md:flex-row flex-col justify-between items-center space-y-4 md:space-y-0'>
        <p className='text-sm md:font-normal font-light text-center sm:text-left text-white-200'>
          Copyright © 2024 Layan Jayasinghe
        </p>

        <div className='flex items-center md:gap-3 gap-6'>
          {socialMedia.map((info) => (
            <Link
              href={info.link}
              target='_blank'
              rel='me'
              key={info.id}
              className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300'
            >
              <Image src={info.img} alt='icons' width={20} height={20} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
