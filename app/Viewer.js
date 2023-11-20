"use client"

import React, { useState } from 'react';
import { queryUserData } from './firebaseService';


const Viewer = () => {

    const [data, setData] =useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const documentdata = await queryUserData();
            setData(documentdata)
            console.log('Query run successfully');
       
          } catch (error) {
            console.error('Error running query: ', error);
            
          } 
        };

    


    return(
        <div className='max-w-fit'>
            <button onClick={handleSubmit}>
                View your data
            </button>

            {data !== null && (
                <div className='grid grid-cols-2'>
                    <p className='grid'>
                        Expenses:
                    </p>
                    <p className='grid'>
                        {data.expenses}
                    </p>

                    
                        
                </div>
        )
        }

        </div>
    )
};



export default Viewer;