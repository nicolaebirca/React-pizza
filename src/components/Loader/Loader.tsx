import React from 'react';
import './Loader.scss'; // Facem și puțin stil

const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
