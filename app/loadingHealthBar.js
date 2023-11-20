import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingHealthBar = ({ healthScore }) => {
  
  return (
    <div className='loadingBar'>
      <Skeleton className='skeletonBar'
        style={{
          height: `${healthScore*100}%`,
          width: '100%',
          borderRadius: '4px',
          position: 'absolute',
        }}
      />
    </div>
  );
};

export default LoadingHealthBar;
