
import React from 'react';

import Form from './form';
import Viewer from './Viewer';

const app = () =>{

  return(
   <main>

    <header>
      <title>
        Financial health app
        </title>  
    </header>

    <div className='grid grid-cols-2 place-content-center place-items-center h-screen'>
    <Form />
    <Viewer />  
    
    </div>
    
   </main> 
  )}

export default app;


