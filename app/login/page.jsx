'use client';

import { useAuthContext } from '@/context/AuthContext';
import { LOGIN_TEST_CREDENTIALS } from '@/enums/enums';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {
    loginHandler,
    resetAuthError,
    authState: { isLoggedIn, token, error },
  } = useAuthContext();

  useLayoutEffect(() => {
    if (isLoggedIn || token !== '') {
      redirect('/');
    }
  }, [isLoggedIn, token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitLoginFormData = () => {
    const { email, password } = formData;
    loginHandler(email, password);
  };

  const loginCredentialsHandler = () => {
    setFormData({
      email: LOGIN_TEST_CREDENTIALS.email,
      password: LOGIN_TEST_CREDENTIALS.password,
    });
  };
  return (
    <main className="bg-gray-50">
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="bg-white w-[350px] sm:w-[450px] h-auto px-6 py-16 pt-8 sm:pt-16 rounded-xl">
          <div className="sm:w-10/12 mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center pb-8 sm:pb-12">
              Hello 👋
            </h2>
            <form
              className="flex flex-col space-y-5"
              onSubmit={e => e.preventDefault()}
            >
              {error && <div className="text-red-500">{error}</div>}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2 rounded-[4px]"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2 rounded-[4px]"
              />
              <button
                className="w-full bg-gray-800 hover:bg-opacity-95 text-white rounded-full py-2"
                onClick={submitLoginFormData}
              >
                Log in
              </button>
            </form>
            <div
              className="text-center mt-4 text-blue-500 underline cursor-pointer"
              onClick={loginCredentialsHandler}
            >
              Use test credentials
            </div>
            <h4 className="text-center pt-8 text-gray-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-blue-500 hover:underline cursor-pointer"
              >
                <span onClick={resetAuthError}>Sign up</span>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
