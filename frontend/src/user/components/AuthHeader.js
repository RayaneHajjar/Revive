import React from 'react';
import { Link } from 'react-router-dom';

import ReviveLeaf from '../../shared/assets/ReviveLeaf.png';

const AuthHeader = ({
    heading,
    question,
    linkName,
    linkUrl="#"
}) => {
    return(
        <div className="pb-10">
            <div className="flex justify-center">
                <img
                    alt="Revive's Leaf"
                    className="h-16"
                    src={ReviveLeaf}/>
            </div>
            <h2 className="mt-4 text-center text-base tablet:text-xl laptop:text-2xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-3 text-center text-sm text-gray-600">
            {question} {' '}
            <Link to={linkUrl} className="font-medium text-green hover:text-brown">
                {linkName}
            </Link>
            </p>
        </div>
    )
}

export default AuthHeader;