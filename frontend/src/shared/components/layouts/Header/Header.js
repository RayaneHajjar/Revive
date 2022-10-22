import React, { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';

import Logo from './Logo';
import LogoutButton from './LogoutButton';
import NavLinks from './NavLinks';

const Header = () => {
    const [menuClicked, setMenuClicked] = useState(false);

    const menuClickedHandler = () => setMenuClicked(!menuClicked);

    return (
        <header className='bg-brown w-full py-2 px-4 sticky top-0 flex items-center justify-between'>
            <Logo className='h-8' />
            {/* NavMenu */}
            {menuClicked ? (
                <div
                    className={
                        'w-full h-60 bg-green bg-opacity-50 absolute z-2 mt-12'
                    }
                >
                    <NavLinks className='flex-col space-y-20' />
                </div>
            ) : (
                <NavLinks className='hidden laptop:flex space-x-10' />
            )}
            <LogoutButton className='hidden laptop:flex' />
            {/* MenuIcon */}
            <span
                className='laptop:hidden text-green text-3xl cursor-pointer'
                onClick={menuClickedHandler}
            >
                {menuClicked ? <FaTimes /> : <FaBars />}
            </span>
        </header>
    );
};

export default Header;
