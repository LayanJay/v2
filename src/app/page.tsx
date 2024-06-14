import Experience from '@/components/sections/experience';
import Footer from '@/components/sections/footer';
import Hero from '@/components/sections/hero';
import RecentProjects from '@/components/sections/recent-projects';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { navItems } from '@/data';
import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('@/components/sections/grid'), {
  ssr: false,
});
const Testimonials = dynamic(() => import('@/components/sections/testimonials'), {
  ssr: false,
});

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
