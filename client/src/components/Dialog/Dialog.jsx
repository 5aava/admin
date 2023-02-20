import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';


const styles = theme => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 7,
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles(() => ({
  root: {
    marginTop: 0,
    marginRight: 20,
    marginBottom: 10,
  },
}))(MuiDialogActions);

class CustomizedDialogs extends React.Component {

  constructor (props) {
    super(props);
  }


  render () {

    return (
      <div>
        <Dialog
          onClose={this.props.close}
          open={this.props.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.props.close}>
              Сгенерировать активационные ключи
            <Divider />
          </DialogTitle>

          <MuiDialogContent>
            <DialogContentText>
              Укажите количество дней продукта и количество ключей
            </DialogContentText>
              Количество дней
            <TextField
              autoFocus
              margin="dense"
              id="days"
              type="number"
              fullWidth
              onChange={this.props.handleOnChange}
            />
            <br /><br />
              Количество ключей
            <TextField
              margin="dense"
              id="count"
              type="number"
              fullWidth
              onChange={this.props.handleOnChange}
            />
          </MuiDialogContent>

          <DialogActions>
            <Button onClick={this.props.close} color="secondary">
              Close
            </Button>
            <Button onClick={this.props.generate} color="primary">
              Generate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CustomizedDialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  generate: PropTypes.func,
  handleOnChange: PropTypes.func,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, null)(CustomizedDialogs);
