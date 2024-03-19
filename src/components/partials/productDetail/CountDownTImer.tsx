import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CountDownTimer = () => {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    clearInterval(interval);
                    restartTimer(); // Restart the timer
                    return 60; // Reset seconds to initial value
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []); // Empty dependency array to run only once on component mount

    const restartTimer = () => {
        // Start the countdown again
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    clearInterval(interval);
                    restartTimer(); // Restart the timer
                    return 60; // Reset seconds to initial value
                }
                return prevSeconds - 1;
            });
        }, 1000);
    };

    return (
        <div className="clock">
            <div className="progress-bar">
                <CircularProgressbar
                    value={(seconds / 60) * 100}
                    text={''}
                    styles={buildStyles({
                        pathTransition: 'none',
                        pathColor: `#EAA22B`,
                        trailColor: 'transparent', // Make the background transparent
                        strokeLinecap: 'butt', // Use butt strokeLinecap to fill the entire width
                    })}
                    strokeWidth={50} // Customize progress bar thickness
                />
            </div>
        </div>
    );
};

export default CountDownTimer;
