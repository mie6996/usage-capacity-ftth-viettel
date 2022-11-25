import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../Toast';

const LoginForm = () => {
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

  const login = async (loginForm) => {
    if (!account || !password) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', loginForm);
      if (response.data.success === true) {
        localStorage.setItem('token', response.data.data.data.data.token);
        router.push('/');
      } else {
        toast.error(response.data.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    login(loginForm);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <Toast />
      <div className="container">
        <form
          onSubmit={submitLoginForm}
          className="bg-white drop-shadow-lg rounded px-10 pt-10 pb-10 max-w-2xl mx-auto my-20 grow"
        >
          <div>
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
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
