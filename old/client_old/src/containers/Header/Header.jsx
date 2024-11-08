import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@mui/styles';
import styles from './styles';

import { Link } from 'react-router-dom';
// import logo from '../../static/images/logo-text.svg';


class Header extends React.Component {

  render () {

    const { classes } = this.props;

    return (
      <header className={classes.header}>
        <div className={classes.headerInner}>
          <Link to={'/'}>
            <img className={classes.headerLogo} src={logo} alt="" />
          </Link>
        </div>

      </header>
    );
  }

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
