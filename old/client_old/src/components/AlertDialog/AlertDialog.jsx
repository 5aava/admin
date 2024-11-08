import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';


class AlertDialog extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  };


    _handleClickOpen = () => {
      this.setState({ isOpen: true });
    }

    _handleClose = () => {
      this.setState({ isOpen: false });
    }

    _handleOk = () => {
      this.props.onOk();
      this.setState({ isOpen: false });
    }

    render () {

      const { btntext, title, desc } = this.props;

      return (

        <span>
          <Button
            color="secondary"
            onClick={this._handleClickOpen}
            variant="contained"
            component="span"
          >
            {btntext}
            <DeleteIcon />
          </Button>
          <Dialog
            open={this.state.isOpen}
            onClose={this._handleClose}
            aria-labelledby={title}
            aria-describedby={desc}
          >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {desc}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this._handleClose} color="primary">
                            No
              </Button>
              <Button onClick={this._handleOk} color="primary" autoFocus>
                            Yes
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      );
    }
}

AlertDialog.propTypes = {
  btntext: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default connect(null, null)(AlertDialog);


