export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    image: '/images/event-full.png',
    title: 'Next.js Conf',
    slug: 'nextjs-conf-2026',
    location: 'San Francisco, CA, USA',
    date: '2026-03-10',
    time: '09:00 AM'
  },
  {
    image: '/images/event1.png',
    title: 'React Conf',
    slug: 'react-conf-2026',
    location: 'Austin, TX, USA',
    date: '2026-01-20',
    time: '10:00 AM'
  },
  {
    image: '/images/event2.png',
    title: 'JSConf EU',
    slug: 'jsconf-eu-2026',
    location: 'Berlin, Germany',
    date: '2026-05-12',
    time: '09:30 AM'
  },
  {
    image: '/images/event3.png',
    title: 'Google I/O',
    slug: 'google-io-2026',
    location: 'Mountain View, CA, USA',
    date: '2026-05-14',
    time: '10:00 AM'
  },
  {
    image: '/images/event4.png',
    title: 'Apple WWDC',
    slug: 'wwdc-2026',
    location: 'San Jose, CA, USA',
    date: '2026-06-02',
    time: '09:00 AM'
  },
  {
    image: '/images/event5.png',
    title: 'NodeConf',
    slug: 'nodeconf-2026',
    location: 'London, UK',
    date: '2026-09-08',
    time: '09:30 AM'
  },
  {
    image: '/images/event6.png',
    title: 'HackMIT (Student Hackathon)',
    slug: 'hackmit-2026',
    location: 'Cambridge, MA, USA',
    date: '2026-09-19',
    time: '08:00 AM'
  },
  // {
  //   image: '/images/ethglobal.png',
  //   title: 'ETHGlobal Paris',
  //   slug: 'ethglobal-paris-2026',
  //   location: 'Paris, France',
  //   date: '2026-02-21',
  //   time: '11:00 AM'
  // }
];
