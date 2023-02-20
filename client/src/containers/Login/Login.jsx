import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../../static/images/logo.jpg';

import Paper from '../../components/Paper/Paper.jsx';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '../../components/Snackbar/Snackbar.jsx';

import { withStyles } from '@mui/styles';
import styles from './styles';

import { loginUser } from '../../redux/actions';
import { snackbarupdate } from '../../redux/actions';


class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

    _handleFieldChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    _handleClick = () => {
      const creds = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginUser(creds);
    };

    _snackbarClick = (obj) => {
      this.props.snackbarupdate(obj);
    };

    render () {
      const { errorMessage, classes } = this.props;

      return (
        <div className={classes.login}>
          <Snackbar />
          <Paper className={classes.loginMain}>
            <div className={classes.loginContent}>
              <img className={classes.loginLogo} src={logo} alt="" />
              <div className={classes.loginHint}>Admin panel</div>
              <form >
                <TextField
                  autoFocus
                  className={classes.loginInput}
                  value={this.state.email}
                  onChange={this._handleFieldChange}
                  type="email"
                  variant="outlined"
                  fullWidth={true}
                  required={true}
                  InputProps={{
                    style: { 
                      fontSize: 12, 
                      marginBottom: 10,
                      width: 400,
                      margin: '1% auto 0'
                    },
                  }}
                  name="email"
                  placeholder="E-mail"
                />
                <TextField
                  className={classes.loginInput}
                  value={this.state.password}
                  onChange={this._handleFieldChange}
                  type="password"
                  variant="outlined"
                  fullWidth={true}
                  required={true}
                  InputProps={{
                    style: { 
                      fontSize: 12, 
                      marginBottom: 10,
                      width: 400,
                      margin: '1% auto 0'
                    },
                  }}
                  name="password"
                  placeholder="Password"
                />
                {errorMessage !== false ? (
                  <p>{errorMessage}</p>
                ) : (<p></p>)}

                <div className={classes.loginDiv}>
                  <Button
                    className={classes.loginBtn}
                    variant="contained"
                    color="primary"
                    onClick={this._handleClick}
                  >
                  Login
                  </Button>
                </div>
              </form>
            </div>
          </Paper>
        </div>
      );
    }

}

Login.propTypes = {
  className: PropTypes.any,
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  snackbarupdate: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  isFetching: state.authState.isFetching,
});

const mapDispatchToProps = {
  loginUser,
  snackbarupdate,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
