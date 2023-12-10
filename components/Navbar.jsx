'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { authState, logoutHandler } = useAuthContext();
  const { isLoggedIn } = authState;

  const logoutBtnHandler = () => {
    logoutHandler();
    router.replace('/login');
  };

  return (
    <nav className="bg-white py-4 fixed w-full top-0">
      <div className="px-8 flex justify-between items-center">
        <div className="">Speedy Image</div>
        {isLoggedIn && <button onClick={logoutBtnHandler}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
