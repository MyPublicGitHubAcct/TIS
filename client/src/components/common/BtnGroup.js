import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const BtnGroup = ({
  name,
  value,
  type,
  disabled,
  datatoggle,
  datatarget,
  ariaexpanded,
  ariacontrols
}) => {
  return (
    <div className="input-group mb-3">
      <button
        className={classnames('btn btn-info btn-block mt-4')}
        data-toggle={datatoggle}
        data-target={datatarget}
        aria-expanded={ariaexpanded}
        aria-controls={ariacontrols}
        type={type}
        name={name}
        disabled={disabled}
      >
        {value}
      </button>
    </div>
  );
};

BtnGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

BtnGroup.defaultProps = {
  type: 'text',
  name: 'text',
  value: 'text'
};

export default BtnGroup;
