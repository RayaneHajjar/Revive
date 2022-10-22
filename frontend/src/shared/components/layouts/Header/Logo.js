import React from 'react';
import { Link } from 'react-router-dom';

import Revive from './Revive.png';

const Logo = (props) => {
    return (
        <Link to='/home'>
            <img src={Revive} alt="Revive's logo" className={props.className} />
        </Link>
    );
};

export default Logo;
