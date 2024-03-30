// frontend part
'use client'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toastify() {
    const [displayedFundIds, setDisplayedFundIds] = useState([]);

    useEffect(() => {
        const checkDeadline = async () => {
            try {
                
                const response = await fetch("/api/deadline");
                
                const deadlineData = await response.json();
                

                deadlineData.forEach(item => {
                    
                    const deadlineDate = new Date(item.deadlineDate);
                    const currentDate = new Date();

                    // Calculate the start and end of the current week
                    
                    const startOfWeek = new Date(currentDate);
                    // startOfWeek.setHours(0, 0, 0, 0 - currentDate.getDay()); // Set to the first day of the week (Sunday)
                    
                    const endOfWeek = new Date(startOfWeek);
                    
        endOfWeek.setDate(startOfWeek.getDate() - 7);
        

                    // const endOfWeek = new Date(startOfWeek.getDate() + 7);
                    // endOfWeek.setDate(startOfWeek.); // Set to the last day of the week (Saturday)
                    
                    if (
                        deadlineDate <= startOfWeek &&
                        deadlineDate >= endOfWeek &&
                        !displayedFundIds.includes(item.fundId)
                    )
                    console.log('yeah');
                    {
                        toast(`The deadline is within the current week at: ${item.deadlineDate}`);
                        setDisplayedFundIds(prevIds => [...prevIds, item.fundId]);
                    }
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkDeadline();
    }, []); // Empty dependency array to ensure the effect runs only once on mount

    const handleButtonClick = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        await checkDeadline(); // Call the checkDeadline function
    }

    return (
        <div>
            <button onClick={handleButtonClick}>Notify!</button>
            <ToastContainer />
        </div>
    );
}

export default Toastify;
