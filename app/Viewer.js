"use client"

import React, { useState } from 'react';
import { queryUserData } from './firebaseService';


const Viewer = () => {

    const [data, setData] =useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const documentdata = await queryUserData();
            
            setData(documentdata);
            console.log('Query run successfully');
       
          } catch (error) {
            console.error('Error running query: ', error);
            
          } 
        };

    


    return(
        <div className='max-w-fit text-center ml-[20rem]'>

           
            <button className='bg-white p-2 m-2 text-black rounded' onClick={handleSubmit}>
                View your data
            </button>
           
            {data !== null && (
                <div className='grid '>
                 
                    {data.map((item, index) => (
                    <div key={index} className='grid border-white border-2 grid-cols-2 p-4 text-left'>
                        <p>{item.month}</p>
                        <p>Financial Health: {(item.health * 100).toFixed(2)}%</p>
                        
                    </div>
                    ))}
                 
                                        
                </div>
        )
        }

        </div>
    )
};



export default Viewer;