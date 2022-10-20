import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Page from '../../shared/components/layouts/Page';
import AuthWrapper from '../components/AuthWrapper';
import AuthHeader from '../components/AuthHeader';
import Input from '../../shared/components/forms/Input';
import Button from '../../shared/components/forms/Button';

import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_PASSWORD,
    VALIDATOR_CONFIRMPASSWORD,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/use-form';
import { useHttp } from '../../shared/hooks/use-http';
import { AuthContext } from '../../shared/context/auth-context';

import LoadingSpinner from '../../shared/components/layouts/LoadingSpinner';
import ErrorModal from '../../shared/components/layouts/ErrorModal';

const RegisterPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const [formState, inputHandler] = useForm(
        {
            firstname: {
                value: '',
                isValid: false,
            },
            lastname: {
                value: '',
                isValid: false,
            },
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
            confirmpassword: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const registerHandler = async (event) => {

        event.preventDefault();
        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/users/register',
                'POST',
                JSON.stringify({
                    firstname: formState.inputs.firstname.value,
                    lastname: formState.inputs.lastname.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
            auth.login(responseData.userId, responseData.firstname, responseData.token);
            navigate("/home");
        } catch (err) {}
    };

    return (
        <Page className='items-center px-8 py-20 bg-white overflow-auto'>
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <AuthWrapper>
                <AuthHeader
                    heading='Register to create an account'
                    question='Already have an account? '
                    linkName='Login'
                    linkUrl='/login'
                />
                <form className='w-full space-y-3 tablet:space-y-5'>
                    <Input
                        id='firstname'
                        element='input'
                        type='text'
                        placeholder='First name'
                        validators={[VALIDATOR_MINLENGTH(2)]}
                        errorMessage='The fisrtname must have a minimum of 2 characters.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='lastname'
                        element='input'
                        type='text'
                        placeholder='Last name'
                        validators={[VALIDATOR_MINLENGTH(2)]}
                        errorMessage='The lastname must have a minimum of 2 characters.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='email'
                        element='input'
                        type='email'
                        placeholder='Email address'
                        validators={[VALIDATOR_EMAIL()]}
                        errorMessage='Please enter a valid email.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='password'
                        element='input'
                        type='password'
                        placeholder='Password'
                        validators={[
                            VALIDATOR_PASSWORD(),
                            VALIDATOR_MINLENGTH(8),
                        ]}
                        errorMessage='The password must have a minimum of 8 characters: at least one uppercase, one lowercase, one digit/number and one special character.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='confirmpassword'
                        element='input'
                        type='password'
                        placeholder='Confirm password'
                        validators={[
                            VALIDATOR_CONFIRMPASSWORD(
                                formState.inputs.password.value
                            ),
                        ]}
                        errorMessage='Confirm Password is not matched.'
                        onInput={inputHandler}
                    />
                    <Button
                        disabled={!formState.isValid}
                        className='w-full'
                        onClick={registerHandler}
                    >
                        Register
                    </Button>
                </form>
            </AuthWrapper>
        </Page>
    );
};

export default RegisterPage;
