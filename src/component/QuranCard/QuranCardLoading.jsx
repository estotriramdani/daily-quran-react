import React from 'react';
import './QuranCardLoading.css';

export const QuranCardLoading = () => {
  return (
    <span>
      <div className="item">
        <p className="arabic">
          <span className="garis"> . . . </span>
        </p>
        <p className="translation">...</p>
      </div>
    </span>
  );
};

export default QuranCardLoading;
