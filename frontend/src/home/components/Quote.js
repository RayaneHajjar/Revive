import React from 'react';

const Quote = (props) => {
    
    return <div className={'max-w-xs tablet:max-w-xl laptop:max-w-4xl p-5 tablet:p-8 laptop:p-14 mx-4 bg-green bg-opacity-80 rounded ' + props.className}>
        <p className='text-brown text-xs laptop:text-lg font-semibold text-justify'>
           {props.content}
        </p>
        <p className='text-brown text-xs laptop:text-lg font-bold mt-2'>- {props.author}</p>
    </div>
}

export default Quote;