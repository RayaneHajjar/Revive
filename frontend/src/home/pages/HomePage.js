import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import Container from '../../shared/components/layouts/Container.js';
import Header from '../../shared/components/layouts/Header/Header.js';
import Datetime from '../components/Datetime.js';
import Quote from '../components/Quote';

import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';

const HomePage = () => {

    const auth = useContext(AuthContext);
    const firstname = auth.firstname;

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:8000/api/quotes/date/${moment().format('YYYY-MM-DD')}`).then(response => {
            setAuthor(response.data.author);
            setContent(response.data.content)
        }).catch(err => {});
    });

    return (
        <>
            <Header />
            <Container className='bg-nature bg-cover bg-left-bottom laptop:bg-right-bottom'>
                <div className='h-full flex flex-col items-center'>
                    <h1 className='text-center text-lg tablet:text-2xl font-noto font-bold text-brown mt-10vh'>
                        Have a nice day, {firstname}!
                    </h1>
                    <Datetime className='text-brown justify-center mt-4' />
                    <Quote
                        className='mt-15vh laptop:mt-28'
                        author={author}
                        content={content}
                    />
                </div>
            </Container>
        </>
    );
};

export default HomePage;
