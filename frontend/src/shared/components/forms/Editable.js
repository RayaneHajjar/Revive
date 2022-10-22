import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

const Editable = (props) => {

    // By default, the editable input only display the value if existed
    const [isEditable, setIsEditable] = useState(false);
    const [inputText, setInputText] = useState(props.defaultValue || "");

    // When submitted, the form executes the submission function defined in props and swipes to display mode
    const submitHandler = (event) => {
        event.preventDefault();
        if (inputText && props.onSubmit) {
            props.onSubmit(inputText);
            setInputText('');
        }
        setIsEditable(false);
    };

    return (
        <div className='w-full'>
            {isEditable ? (
                <form
                    className='flex flex-col gap-2'
                    onSubmit={submitHandler}
                >
                    <input
                        type="text"
                        value={inputText}
                        placeholder={props.placeholder || props.text}
                        onChange={(event) => setInputText(event.target.value)}
                        autoFocus
                        className='border-2 border-green rounded outline-none text-base px-2 py-1'
                    />
                    <div className='flex gap-2 items-center'>
                        <button type='submit' className='bg-brown rounded-sm cursor-pointer border-4 outline-none text-white border-none px-2 py-1 active:translate-y-1'>
                            {props.buttonText || 'Add'}
                        </button>
                        <MdOutlineClose
                            onClick={() => setIsEditable(false)}
                            className='cursor-pointer h-6 w-6 fill-brown'
                        />
                    </div>
                </form>
            ) : (
                <div
                    className={`w-full px-2 py-1 rounded bg-brown text-white cursor-pointer ${
                        props.displayClass ? props.displayClass : ''
                    }`}
                    onClick={(event) => {
                        event.preventDefault();
                        setIsEditable(true);
                    }}
                >
                    {props.text}
                </div>
            )}
        </div>
    );
};

export default Editable;