import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaCalendar, FaClock } from 'react-icons/fa';

const Datetime = (props) => {

    const [date, setDate] = useState(moment());
    
    useEffect(() => {
        let timer = setInterval(() => {
            setDate(moment());
        }, 1000);
        return () => clearInterval(timer);
    }, [date]);

    return (
        <div className={'flex flex-wrap items-center text-xxs tablet:text-base ' + props.className}>
            <FaCalendar className='text-xs tablet:text-lg' />
            <span className='ml-1 mr-4 tablet:ml-2 tablet:mr-8'>{date.format('dddd, MMMM Do YYYY')}</span>
            <FaClock className='text-xs tablet:text-lg' />
            <span className='ml-1 tablet:ml-2'>{date.format('h:mm A')}</span>
        </div>
    );
};

export default Datetime;
