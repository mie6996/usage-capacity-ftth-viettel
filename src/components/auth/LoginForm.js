import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../store/auth/index.js';
import { useFormik } from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object({
  account: yup.string().required('Vui lòng nhập tài khoản'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const login = (values) => {
    const result = dispatch(loginAsync(values));

    toast.promise(result, {
      loading: 'Đang đăng nhập...',
      success: (data) => {
        if (data.payload.success) {
          router.push('/');
          return 'Đăng nhập thành công';
        }
        return 'Tài khoản hoặc mật khẩu không đúng';
      },
      error: (error) => {
        console.log(error);
        return 'Tài khoản hoặc mật khẩu không đúng';
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      account: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      login(values);
    },
  });

  return (
    <>
      <div className="sm:mx-auto mx-5 sm:w-1/3 h-full mt-10">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white drop-shadow-lg rounded p-10 space-y-4"
        >
          <div>
            <div className="block text-gray-700 text-5xl font-bold text-center">
              Login
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tài khoản
            </label>
            <input
              name="account"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="acount"
              type="text"
              placeholder="Tài khoản"
              value={formik.values.account}
              onChange={formik.handleChange}
            ></input>
            <span className="text-red-500">{formik.errors.account}</span>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
            ></input>
            <span className="text-red-500">{formik.errors.password}</span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </>
  );
}
