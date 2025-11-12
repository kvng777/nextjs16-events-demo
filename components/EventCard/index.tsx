import Image from 'next/image'
import Link from 'next/link';

interface IEvent {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({image, title, slug, location, date, time}: IEvent) => {

  console.log('image', image);

  return (
    <Link href={slug} id="event-card">
      <Image src={image} alt='image photo' width={300} height={410} className='poster'/>

      <div className='flex flex-row gap-2'>
        <Image src={'/icons/pin.svg'} alt='image photo' width={14} height={14}/>
        <p>{location}</p>
      </div>
      
      <p className='title'>{title}</p>
      
      <div className='datetime'>
        <div>
          <Image src={'/icons/calendar.svg'} alt='image photo' width={14} height={14}/>
          <p>{date}</p>
        </div>
        <div>
          <Image src={'/icons/clock.svg'} alt='image photo' width={14} height={14}/>
          <p>{time}</p>
        </div>
      </div>
    </Link>
  )
}

export default EventCard