import React from 'react';
import useAuth from './useAuth';

const MainPage = ({code}) => {
    const accessToken = useAuth(code)
    return (
        <div>
           {code}
        </div>
    );
};

export default MainPage;