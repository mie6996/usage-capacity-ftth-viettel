import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import logo from '../../../public/viettel-logo.png';
import { logoutAsync, selectIsAuthenticating } from '../../store/auth';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Header = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticating);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  className="block h-20 w-auto"
                  src={logo}
                  alt="Viettel Logo"
                  priority
                ></Image>
              </div>
            </div>

            <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isAuthenticated ? (
                <>
                  <div className="rounded shadow-xl border-slate-400 p-2 m-2 hidden sm:inline-block">
                    <div className="text-white font-bold">
                      Tài khoản:{'  '}
                      <span className="font-normal">{user?.phone_number}</span>
                    </div>
                    <div className="text-white font-bold">
                      Tên: <span className="font-normal">{user?.fullName}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(logoutAsync());
                      router.push('/login');
                    }}
                    className="mx-4 p-2 bg-red-400 rounded-lg"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
