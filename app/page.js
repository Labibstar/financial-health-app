
import React from 'react';

import Form from './form';
import Viewer from './Viewer';

const app = () =>{

  return(
    <div className='grid grid-cols-2 place-content-center place-items-center h-screen'>
    <Form />
    <Viewer />  
    
    </div>
    
  )}

export default app;


