'use client';
import Image from "next/image";

const ExploreBtn = () => {
  return (
    <button 
      type='button' 
      onClick={() => console.log('ExploreBtn Clicked!')}
      className="mt-7 mx-auto"
      id="explore-btn"
    >
      <a href="#events">
        Click Me!
        <Image src='/icons/arrow-down.svg' alt='arrow-down' height={24} width={24}/>
      </a>
    </button>
  )
}

export default ExploreBtn