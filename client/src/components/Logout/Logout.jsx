import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import { logoutUser } from '../../redux/actions';


class Logout extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={this.props.logoutUser}
      >
        Выйти
      </Button>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(null, mapDispatchToProps)(Logout);
