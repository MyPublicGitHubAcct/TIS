import React, { Component } from 'react';
// import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class ChooseUser extends Component {
  constructor() {
    super();
    this.state = {
      users: {},
      errors: {}
    };
  }

  componentDidMount() {
    // load data into users as json
  }

  render() {
    // const { errors } = this.state;

    return (
      <div id="form-control">
        fuuuuulalllallaaallaaa
        {/* <Typeahead
          options={users}
          labelKey={option =>
            ` ${option.ID} ${option.FirstName} ${option.LastName}`
          }
          onChange={selected => {
            // Handle selections...
          }} */}
        />
      </div>
    );
  }
}

export default ChooseUser;
