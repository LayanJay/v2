import Grid from '@/components/sections/grid';
import Hero from '@/components/sections/hero';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { navItems } from '@/data';

export default function Home() {
  return (
    <main className='relative flex flex-col items-center justify-center px-5 mx-auto overflow-hidden bg-black-100 sm:px-10'>
      <FloatingNav navItems={navItems} />
      <Hero />
      <Grid />
    </main>
  );
}
