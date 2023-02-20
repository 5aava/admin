import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { withStyles } from '@mui/styles';
import styles from './styles';

import LoginContainer from '../Login/Login.jsx';
import Loader from '../Loader/Loader.jsx';

import Main from '../Main/Main.jsx';


class AppContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      sidebarOpened: false,
    };
  }

  render () {
    const { authState, classes } = this.props;

    return (
      <div className={classes.app}>
        {authState.isFetching === false ? (
          authState.isAuthenticated ? (
            <Main />
          ) : (
            <LoginContainer />
          )
        ) : (
          <Loader/>
        )}
      </div>
    );
  }
}

AppContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  authState: PropTypes.object,
};

const mapStateToProps = state => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(withStyles(styles)(AppContainer));
