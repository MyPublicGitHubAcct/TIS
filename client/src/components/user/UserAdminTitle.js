import React from 'react';
import PropTypes from 'prop-types';

const UserAdminTitle = ({ title, subheading }) => {
  return (
    <div className="div form-group">
      <h1 className="display-4 text-center">{title}</h1>
      <p className="lead text-center">{subheading}</p>
    </div>
  );
};

UserAdminTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired
};

export default UserAdminTitle;
