import React from 'react';
import './HadisLoading.css';

export const HadisCardLoading = () => {
  return (
    <div
      className="item"
      style={{
        marginBottom: '20px',
        paddingBottom: '20px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span className="line">• • • •</span>
      <div className="arabic"> </div>
    </div>
  );
};

export default HadisCardLoading;
