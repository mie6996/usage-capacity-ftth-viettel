import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import favicon from '../../public/favicon.png';
import logo from '../../public/viettel-logo.png';

const Header = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  className="block h-20 w-auto"
                  src={logo}
                  alt="Viettel Logo"
                ></Image>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Image
                className="h-8 w-8 rounded-full"
                src={favicon}
                alt="Avatar"
              ></Image>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
