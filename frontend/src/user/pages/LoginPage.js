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
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/use-form';
import { useHttp } from '../../shared/hooks/use-http';
import { AuthContext } from '../../shared/context/auth-context';

import LoadingSpinner from '../../shared/components/layouts/LoadingSpinner';
import ErrorModal from '../../shared/components/layouts/ErrorModal';

const LoginPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttp();
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const loginHandler = async (event) => {

        event.preventDefault();
        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/users/login',
                'POST',
                JSON.stringify({
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
                    heading='Login to your account'
                    question="Don't have an account yet? "
                    linkName='Register'
                    linkUrl='/register'
                />
                <form className='w-full space-y-3 tablet:space-y-5'>
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
                    <Button disabled={!formState.isValid} className='w-full' onClick={loginHandler}>Login</Button>
                </form>
            </AuthWrapper>
        </Page>
    );
};

export default LoginPage;
