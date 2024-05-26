import Grid from '@/components/sections/grid';
import Hero from '@/components/sections/hero';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { navItems } from '@/data';
import dynamic from 'next/dynamic';

const RecentProjects = dynamic(() => import('@/components/sections/recent-projects'));
const Testimonials = dynamic(() => import('@/components/sections/testimonials'));
const Experience = dynamic(() => import('@/components/sections/experience'));
const Footer = dynamic(() => import('@/components/sections/footer'));

export default function Home() {
  return (
    <main className='relative flex flex-col items-center justify-center px-5 mx-auto overflow-hidden bg-black-100 sm:px-10'>
      <FloatingNav navItems={navItems} />
      <Hero />
      <Grid />
      <RecentProjects />
      <Testimonials />
      <Experience />
      <Footer />
    </main>
  );
}
