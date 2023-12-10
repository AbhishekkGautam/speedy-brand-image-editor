'use client';

import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');
  const {
    signupHandler,
    authState: { isLoggedIn },
  } = useAuthContext();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      redirect('/');
    }
  }, [isLoggedIn]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitSignupFormData = () => {
    const { firstName, email, password } = formData;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Invalid email');
      return;
    }

    if (password?.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }
    signupHandler(firstName, email, password);
  };

  return (
    <main className="bg-gray-50">
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="bg-white w-[350px] sm:w-[450px] h-auto px-6 py-16 pt-8 sm:pt-16 rounded-xl">
          <div className="sm:w-10/12 mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center pb-8 sm:pb-12">
              Sign Up
            </h2>
            <form
              className="flex flex-col space-y-5"
              onSubmit={e => e.preventDefault()}
            >
              {formError && <div className="text-red-500">{formError}</div>}
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2 rounded-[4px]"
              />
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
                type="submit"
                className="w-full bg-gray-800 hover:bg-opacity-95 text-white rounded-full py-2"
                onClick={submitSignupFormData}
              >
                Create New Account
              </button>
            </form>
            <h4 className="text-center pt-8 text-gray-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Log in
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
