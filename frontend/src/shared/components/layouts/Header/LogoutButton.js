import React, { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../../context/auth-context';

const LogoutButton = (props) => {
    const auth = useContext(AuthContext);
    return (
        <button className={'bg-green py-1 px-2 rounded text-white flex items-center ' + props.className} onClick={auth.logout}>
            <span className='pr-1'>
                <FiLogOut />
            </span>
            <span className='font-semibold'>Logout</span>
        </button>
    );
};

export default LogoutButton;
