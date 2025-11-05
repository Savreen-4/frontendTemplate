import React from 'react';
import { Button } from 'react-bootstrap';

const NoDataComponent = ({ message }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5">
      <p className="text-muted fs-5 mb-3">{message}</p>
      {/* {showButton && <Button variant="primary" onClick={onButtonClick}>
        {buttonText}
      </Button>} */}
    </div>
  );
};

export default NoDataComponent;
