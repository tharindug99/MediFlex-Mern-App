import React, { useState, useEffect, useContext } from 'react';
import { authContext } from '../../src/context/authContext';
import { Link } from 'react-router-dom';
import { AiOutlineArrowUp } from 'react-icons/ai';
import userimg from '../../src/assets/images/doc.png'

const NavigationLinks = ({ links }) => {
  return (
    <div className="lg:hidden flex flex-col mt-4">
      {links.map((link, index) => (
        <Link
          key={index}
          className="my-2 py-1 border-b-2 border-slate-800 hover:text-cyan-500 hover:border-cyan-200 transition border-b2 cursor-pointer"
          to={link.path}
        >
          {link.display}
        </Link>
      ))}
    </div>
  );
};

const Navbar = () => {
  const navLinks = [
    {
      path: '/home',
      display: 'Home',
    },
    {
      path: '/doctors',
      display: 'Find a Doctor',
    },
    {
      path: '/services',
      display: 'Services',
    },
    {
      path: '/contact',
      display: 'Contact',
    },
    {
      path: '/login',
      display: 'Login',
    },
    {
      path: '/register',
      display: 'SignUp',
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, token, role } = useContext(authContext);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        transition: 'background-color 0.3s ease-in-out',
      }}
    >
      <div className="h-10vh flex flex-col lg:flex-row justify-between z-50 text-cyan-900 lg:py-5 px-20 py-4">
        <div className="flex items-center">
          <span className="text-3xl font-bold px--4">MediFlex</span>
          <div className="lg:hidden md:hidden flex items-center ml-24 justify-end font-normal">
            <button className="text-2xl px-4" onClick={toggleMobileMenu}>
              &#9776; {/* Hamburger Icon */}
            </button>
          </div>
        </div>
        {/* Mobile Menu (Right-aligned) */}
        {isMobileMenuOpen && <NavigationLinks links={navLinks} />}
        {/* Desktop Menu (Left-aligned) */}
        <div className="lg:flex md:flex hidden lg:justify-end">
          <ul className="lg:flex md:flex lg:space-x-4 md:space-x-4 lg:items-center text-center">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={`text-center my-2 py-1 border-b-2 border-slate-800 hover:text-cyan-500 hover:border-cyan-500 transition border-b2 cursor-pointer mx-auto ${
                  link.path === '/login' || link.path === '/register' ? 'lg:hidden' : ''
                }`}
              >
                <Link to={link.path}>{link.display}</Link>
              </li>
            ))}
          </ul>

          {(user && token) ? (
            <div className="flex items-center gap-4 ml-5">
              <div className="hidden md:block">
                <Link to={`${role == 'doctor' ? './doctors/profile/me' : 'users/profile/me'}`}>
                  <h1>{user?.name}</h1>
                  <figure className="w-[35px] h-[35px] rounded-full">
                    <img src={user?.photo ? null : userimg} alt="" className="w-full rounded-full" />
                  </figure>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <li className=" list-none mx-5">
                <Link to="/login">
                  <button className="bg-blue-500 ml-10 px-4 rounded-lg text-white font-[600] h-[44px]">
                    Login
                  </button>
                </Link>
              </li>
              <li className="mx-auto list-none">
                <Link to="/register">
                  <button className="bg-white text-blue-500 border-blue-500 border-2 px-4 rounded-lg font-[600] h-[44px]">
                    Sign up
                  </button>
                </Link>
              </li>
            </>
          )}
        </div>
        <button
          className={`${
            isScrolled ? 'block' : 'hidden'
          } fixed bottom-4 right-4 bg-cyan-500 text-white py-2 px-4 rounded-full h-12 w-12 shadow-md`}
          onClick={scrollToTop}
        >
          <AiOutlineArrowUp />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
