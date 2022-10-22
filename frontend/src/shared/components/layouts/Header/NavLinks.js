import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = (props) => {
    return (
        <div className={'flex items-center justify-center ' + props.className}>
            <Link to='/home' className='text-green'>
                Dashboard
            </Link>
            <Link to='/tasks' className='text-white'>
                Tasks
            </Link>
        </div>
    );
};

export default NavLinks;
