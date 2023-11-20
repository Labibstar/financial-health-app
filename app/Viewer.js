"use client"

import React from 'react';
import { queryUserData } from './firebaseService';


const Viewer = () => {

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const documentId = await queryUserData();
            console.log('Query ran ');
       
          } catch (error) {
            console.error('Error running query: ', error);
            
          } 
        };

    


    return(
        <div className='max-w-fit'>
            <button onClick={handleSubmit}>
                View your data
            </button>

        </div>
    )
};



export default Viewer;