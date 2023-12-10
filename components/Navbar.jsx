'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { authState, logoutHandler } = useAuthContext();
  const { isLoggedIn, userInfo } = authState;

  const logoutBtnHandler = () => {
    logoutHandler();
    router.replace('/login');
  };

  return (
    <nav className="bg-white py-4 fixed w-full top-0">
      <div className="px-8 flex justify-between items-center">
        <div className="">Speedy Image</div>
        {isLoggedIn && (
          <button
            className="border-none bg-gray-100 py-2 px-4 rounded-md text-sm"
            onClick={logoutBtnHandler}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
