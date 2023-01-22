import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../store/auth/index.js';

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    account: '',
    password: '',
  });

  const { account, password } = loginForm;

  const onChangeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    login(loginForm);
  };

  const login = (loginForm) => {
    const result = dispatch(loginAsync(loginForm));

    toast.promise(result, {
      loading: 'Đang đăng nhập...',
      success: (data) => {
        if (data.payload.success) {
          router.push('/');
          return 'Đăng nhập thành công';
        } else {
          return 'Tài khoản hoặc mật khẩu không đúng';
        }
      },
      error: (error) => {
        console.log(error);
        return 'Tài khoản hoặc mật khẩu không đúng';
      },
    });
  };

  return (
    <>
      <div className="h-full">
        <form
          onSubmit={submitLoginForm}
          className="bg-white drop-shadow-lg rounded sm:m-10 sm:p-4 p-4"
        >
          <div className="mb-6">
            <div className="block text-gray-700 text-5xl font-bold text-center">
              Đăng nhập
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tài khoản hoặc số điện thoại
            </label>
            <input
              name="account"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="acount"
              type="text"
              placeholder="Tài khoản hoặc số điện thoại"
              value={account}
              onChange={onChangeLoginForm}
            ></input>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mật khẩu"
              onChange={onChangeLoginForm}
              value={password}
            ></input>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Đăng nhập
          </button>
        </form>
      </div>
    </>
  );
}
