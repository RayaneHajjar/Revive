import React, { useState } from 'react';

const LoginExtra = () => {

    const [isChecked, setChecked] = useState(false);

    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <input
                    id='remember-me'
                    type='checkbox'
                    className='h-4 w-4 accent-green border-gray-300 rounded'
                />
                <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'
                >
                    Remember me
                </label>
            </div>

            <div className='text-sm'>
                <a href='#' className='font-medium text-green hover:text-brown'>
                    Forgot your password?
                </a>
            </div>
        </div>
    );
};

export default LoginExtra;
