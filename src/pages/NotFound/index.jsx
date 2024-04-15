import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div
        className="not-found"
        style={{
            backgroundImage: `url('/images/not_found.jpg')`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }}
    ></div>
);

export default NotFound;
