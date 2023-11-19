import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingHealthBar = ({ healthScore }) => {
  // Normalize the health score to a percentage between 0 and 100
  const normalizedScore = Math.min(Math.max(healthScore, 0), 100);

  return (
    <div style={{ width: '100%', height: '20px', position: 'relative', overflow: 'hidden' }}>
      <Skeleton
        style={{
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
