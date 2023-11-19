import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingHealthBar = ({ healthScore }) => {
   
    console.log(healthScore);
  // Normalize the health score to a percentage between 0 and 100
  const normalizedScore = Math.min(Math.max(healthScore*100, 0), 100);
  
  console.log("loading score"+normalizedScore);
  return (
    <div style={{ background: 'white', width: '100%', height: '20px', position: 'relative', overflow: 'hidden' }}>
      <Skeleton
        style={{
          background: 'aquamarine',
          width: `${normalizedScore}%`,
          height: '100%',
          borderRadius: '4px',
          position: 'absolute',
        }}
      />
    </div>
  );
};

export default LoadingHealthBar;
