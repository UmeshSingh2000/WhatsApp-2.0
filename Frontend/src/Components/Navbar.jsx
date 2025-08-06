import logo from '../assets/WhatsApp.png'
const Navbar = () => {
    return (
        <nav>
            <header className='flex items-center px-7'>
                <img src={logo} alt="WhatsApp Logo" className='w-12' />
                <p className='text-xl font-bold text-[#199E0F]'>WhatsApp</p>
            </header>
        </nav>
    )
}

export default Navbar
