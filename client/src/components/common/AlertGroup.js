import React from 'react';
// import classnames from 'classnames';
import PropTypes from 'prop-types';

let altClasses = '';

const AlertGroup = ({ type, id, msg }) => {
  if (type === 'success') {
    altClasses = 'alert alert-success alert-dismissible fade collapse';
  } else if (type === 'failure') {
    altClasses = 'alert alert-danger alert-dismissible fade collapse';
  } else {
    altClasses = '';
  }

  return (
    <div className={altClasses} id={id} role="alert">
      <strong>{msg}</strong>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

AlertGroup.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  msg: PropTypes.string
};

AlertGroup.defaultProps = {
  type: 'text',
  id: '',
  msg: ''
};

export default AlertGroup;
