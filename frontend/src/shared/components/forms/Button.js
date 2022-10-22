import React from 'react';

const Button = (props) => {
    return (
        <button
            className={`flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green hover:bg-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green disabled:hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed ${props.className}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
