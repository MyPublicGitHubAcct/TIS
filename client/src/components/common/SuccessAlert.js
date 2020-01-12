import React from 'react';
import PropTypes from 'prop-types';

const SuccessAlert = ({ id, className, message }) => {
  return (
    <div id={id} className={className} role="alert">
      {message}
    </div>
  );
};

SuccessAlert.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

SuccessAlert.defaultProps = {
  id: '',
  className: '',
  message: ''
};

export default SuccessAlert;
