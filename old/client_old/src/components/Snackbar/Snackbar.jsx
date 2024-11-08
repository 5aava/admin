import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';

import green from '@mui/material/colors/green';
import amber from '@mui/material/colors/amber';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import { snackbarupdate } from '../../redux/actions';
import { snackbarclose } from '../../redux/actions';


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor:  '#444444', //green[600],
  },
  error: {
    backgroundColor: '#444444', // theme.palette.error.dark,
  },
  info: {
    backgroundColor:  '#444444', // theme.palette.error.dark,
  },
  warning: {
    backgroundColor:  '#444444', //amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 8,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});


function MySnackbarContent (props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (

    <SnackbarContent
      //className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" /* className={classes.message} */>
          <Icon /* className={classNames(classes.icon, classes.iconVariant)} */ />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          /* className={classes.close} */
          onClick={onClose}
        >
          <CloseIcon /* className={classes.icon} */ />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  // classes: PropTypes.object.isRequired,
  /* className: PropTypes.string, */
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = (MySnackbarContent); // withStyles(styles1)

const styles2 = theme => ({
  margin: {
    margin: 8,
  },
});

class CustomizedSnackbars extends React.Component {
    state = {
      open: false,
    };

    handleClick = () => {
      this.setState({ open: true });
    };

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      this.setState({ open: false });
    };

    _snackbarUpdate = value => {
      this.props.snackbarupdate(value);
    }

    _snackbarClose = () => {
      this.props.snackbarclose();
    }


    render () {
      const { classes } = this.props;

      return (
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.props.snackbar.isOpen}
            autoHideDuration={this.props.snackbar.time}
            onClose={this._snackbarClose}
          >
            <MySnackbarContentWrapper
              variant={this.props.snackbar.type}
              className={classes.margin}
              message={this.props.snackbar.message}
              onClose={this._snackbarClose}
            />
          </Snackbar>
        </div>
      );
    }
}

CustomizedSnackbars.propTypes = {
  snackbarupdate: PropTypes.func.isRequired,
  snackbarclose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  snackbar: PropTypes.object,
  update: PropTypes.func,
};

const mapStateToProps = state => ({
  snackbar: state.snackbarState.snackbar,
});

const mapDispatchToProps = {
  snackbarupdate,
  snackbarclose,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles2)(CustomizedSnackbars));
