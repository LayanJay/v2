import b1 from '../../public/assets/b1.svg';
import b4 from '../../public/assets/b4.svg';
import b5 from '../../public/assets/b5.svg';
import grid from '../../public/assets/grid.svg';

import p1 from '../../public/assets/p1/p1.png';
import p2 from '../../public/assets/p2/p2.png';
import p3 from '../../public/assets/p3/p3.png';
import p4 from '../../public/assets/p4/p4.png';

import cloudRun from '../../public/assets/cloudrun.svg';
import framerMotion from '../../public/assets/fm.svg';
import nextjs from '../../public/assets/next.svg';
import nodejs from '../../public/assets/node.svg';
import react from '../../public/assets/re.svg';
import tailwind from '../../public/assets/tail.svg';
import typescript from '../../public/assets/ts.svg';

import exp1 from '../../public/assets/exp1.svg';
import exp2 from '../../public/assets/exp2.svg';
import exp3 from '../../public/assets/exp3.svg';
import exp4 from '../../public/assets/exp4.svg';

import profile from '../../public/assets/profile.svg';
import sankhaja from '../../public/assets/sankhaja.jpeg';

import git from '../../public/assets/git.svg';
import linkedin from '../../public/assets/link.svg';

export const navItems = [
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Testimonials', link: '#testimonials' },
  // {
  //   name: 'Blog',
  //   link: '#blog',
  // },
  { name: 'Contact', link: '#contact' },
];

export const gridItems = [
  {
    id: 1,
    title: 'Bridging Continents with Code',
    description: 'Global Client Partnerships',

    className: 'lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]',
    imgClassName: '',
    titleClassName: 'justify-start',
    descriptionClassName: 'md:max-w-54',
    img: '',
    spareImg: '',
  },
  {
    id: 2,
    title: 'Fostering Open Communication and Transparency',
    description: 'Collaborative Client Partnerships',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
    imgClassName: 'w-full h-full',
    titleClassName: 'justify-start',
    descriptionClassName: 'md:max-w-54',
    img: b1,
    spareImg: '',
  },
  {
    id: 3,
    title: 'My Tech Toolbox',
    description: 'Cutting-Edge Technologies',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
    imgClassName: '',
    titleClassName: 'justify-center',
    descriptionClassName: 'md:max-w-54',
    img: '',
    spareImg: '',
  },
  {
    id: 4,
    title: 'Driven by a Passion for Development',
    description: 'Tech Enthusiast',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
    imgClassName: '',
    titleClassName: 'justify-start',
    img: grid,
    spareImg: b4,
  },

  {
    id: 5,
    title: 'Advanced Next.js Concepts in Focus',
    description: 'Deepening My Expertise',
    className: 'md:col-span-3 md:row-span-2',
    imgClassName: 'absolute right-0 bottom-0 md:w-96 w-60',
    titleClassName: 'justify-center md:justify-start lg:justify-center',
    descriptionClassName: 'md:max-w-54',
    img: b5,
    spareImg: grid,
  },
  {
    id: 6,
    title: 'Embarking on a Joint Project?',
    description: "Let's Collaborate",
    className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
    imgClassName: '',
    titleClassName: 'justify-center md:max-w-full max-w-60 text-center',
    descriptionClassName: 'md:max-w-54',
    img: '',
    spareImg: '',
  },
];

export const projects = [
  {
    id: 1,
    title: 'hmm. Clothing - Wherever & Whenever, Brand of your Lifestyle',
    description:
      'Discover the ultimate lifestyle wear destination at hmm. Clothing! Crafted with 100% quality materials, our fashion products guarantee pure comfort anytime, anywhere.',
    img: p1,
    iconLists: [react, nextjs, tailwind, typescript, framerMotion, nodejs, cloudRun],
    link: 'https://hmmclothings.com',
  },
  {
    id: 2,
    title: 'Salance - Unlock the future of digital commerce',
    description: `Salance stands out as the ultimate choice for e-commerce platforms, offering unrivaled customization and affordability to swiftly bring their customers' stores online.`,
    img: p2,
    iconLists: [react, nextjs, tailwind, typescript, framerMotion, nodejs, cloudRun],
    link: 'https://salance.biz',
  },
  {
    id: 3,
    title: 'Initiative for Evidence-Based Sustainability Reporting & Auditing',
    description: 'Enabling; Quality, Reliability, Integrity & Ethics in ESG Audit & Assurance',
    img: p3,
    iconLists: [react, nextjs, tailwind, typescript, nodejs, cloudRun],
    link: '',
  },
  {
    id: 4,
    title: 'Troofing - Building with Confidence',
    description:
      'Troofing supplies cement-related products from the Tokyo Group. They offer tile adhesive, waterproofing, and construction grout at affordable prices.',
    img: p4,
    iconLists: [react, nextjs, tailwind, typescript, framerMotion, cloudRun],
    link: '',
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Layan's role as a Technical Advisor has been a transformative experience for Unwir PVT LTD. Layan's deep expertise in software development and his strategic insights have significantly enhanced our project outcomes. His guidance has been instrumental in streamlining our processes and elevating the quality of our deliverables. For any organization that is looking for a professional with sound technical knowledge, Layan is the answer.",
    name: 'Sankhaja Hapukotuwa',
    image: sankhaja,
    title: 'Director & CEO',
    company: 'Unwir PVT LTD',
  },
  {
    id: 2,
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    image: profile,
    title: 'Director of AlphaStream Technologies',
    company: '',
  },
  {
    id: 3,
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    image: profile,
    title: 'Director of AlphaStream Technologies',
    company: '',
  },
];

export const workExperience = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Freelance',
    description:
      'Designed and developed web applications using ReactJS, NodeJS,  for various clients',
    className: 'md:col-span-2',
    thumbnail: exp1,
  },
  {
    id: 2,
    title: 'Full Stack Developer - Intern',
    company: 'Jigsaw Ensemble',
    description:
      'Led end-to-end software development, from conceptualization to deployment. Wrote clean, robust code, ensuring seamless integration and functionality. Produced detailed specifications, maintaining software performance and documentation.',
    className: 'md:col-span-2',
    thumbnail: exp2,
  },
  {
    id: 3,
    title: 'Software Engineer',
    company: 'Derana Macroentertainment',
    description:
      'As a key team member, I execute the complete software development life cycle, crafting well-designed, testable code. I produce specifications, integrate components seamlessly, and ensure full functionality, meticulously documenting and maintaining software excellence.',
    className: 'md:col-span-2',
    thumbnail: exp4,
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'Metaroon Labs',
    description:
      'Led full software development lifecycle, producing well-designed, testable code. Integrated components into robust systems, ensuring operational feasibility. Proficient in JavaScript, React.js, Firebase, TypeScript, Node.js, and Next.js.',
    className: 'md:col-span-2',
    thumbnail: exp1,
  },
  {
    id: 5,
    title: 'Software Engineering Consultant',
    company: 'Unwir',
    description:
      'I oversee projects and mentor junior developers, providing training in TypeScript and Next.js. Responsibilities include code reviews and conducting knowledge transfer sessions.',
    className: 'md:col-span-2',
    thumbnail: exp3,
  },
  {
    id: 6,
    title: 'Software Engineer',
    company: 'EatMe Singapore',
    description: `As a key team member, I wrote robust, testable code and reviewed others' work, ensuring top-notch quality. I crafted operational specifications, integrating diverse software components seamlessly. Proficient in JavaScript, React.js, AWS, TypeScript, Node.js, and Next.js, I developed and maintained user-facing features, enriching the software experience.`,
    className: 'md:col-span-2',
    thumbnail: exp4,
  },
];

export const socialMedia = [
  {
    id: 1,
    link: 'https://github.com/LayanJay',
    img: git,
  },
  {
    id: 2,
    link: 'https://www.linkedin.com/in/layan-jayasinghe-944746215/',
    img: linkedin,
  },
];
