import React from 'react';

const Greeting = () => {
    // gets current date and time in Singapore Standard Time
    const date = new Date();
    const hour = date.getHours();
    return (
        <div className="greeting">
            {hour>=12 ? hour>=16 ? <h2>Good Evening Sir</h2> : <h2>Good Afternoon Sir</h2> : <h2>Good Morning Sir</h2>}
        </div>
    );
};

export default Greeting;