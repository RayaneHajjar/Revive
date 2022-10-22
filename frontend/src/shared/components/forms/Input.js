import React, { useReducer, useEffect } from 'react';
import { validate } from '../../utils/validators';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators),
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            }
        default:
            return state;
    }
};

//Input Props: id, label, element, type, placeholder, rows, validators, errorMessage
const Input = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        isTouched: false,
    });

    const {id, onInput} = props;
    const {value, isValid} = inputState;

    // useEffect return the id, the value and the validity of the input
    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    // The changeHandler function is called on every key stroke
    const changeHandler = (event) => {
        dispatch({ type: 'CHANGE', value: event.target.value, validators: props.validators });
    };

    // The touchHandler function is called when the user looses focus on the input element
    const touchHandler = () => {
        dispatch({type: 'TOUCH'});
    }

    // We can choose either a simple input or a text area
    const element =
        props.element === 'input' ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
                className={`w-full text-sm px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-green ${!inputState.isValid && inputState.isTouched && 'border-red-700 bg-red-50 focus:border-red-700'}`}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
            />
        );

    return (
        <div className={'flex flex-col'}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <span className='text-red-700 text-sm mt-1'>
                    {props.errorMessage}
                </span>
            )}
        </div>
    );
};

export default Input;
