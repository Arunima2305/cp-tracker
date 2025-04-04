import React from 'react';

const Upcoming = () => {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f1ec',
      }}
    >
      <h1
        style={{
          color: '#534E4A',  // your dark brown
          fontSize: '3rem',
          fontWeight: 'bold',
        }}
      >
        🚧 Upcoming Feature!
      </h1>
    </div>
  );
};

export default Upcoming;
