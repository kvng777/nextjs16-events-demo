import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link className='logo' href={'/'}>
          <Image src={'/icons/logo.png'} width={24} height={24} alt='image'/>
          <p>Dev Life</p>
        </Link>

        <ul className=''>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/'>About</Link></li>
          <li><Link href='/'>Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar