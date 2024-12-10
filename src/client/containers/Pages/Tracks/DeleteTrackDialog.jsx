import {useState, useEffect} from 'react';
import privateFetcher from '../../../modules/privateFetcher'

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function DeleteTrackDialog(props) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await privateFetcher('/api/private/tracks/delete', {id: props.trackId});
    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Лицензиар удален', 'delete');
    }
  }

  return (
    <BootstrapDialog
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <form onSubmit={handleSubmit} >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Удалить трек
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.close}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Точно решили удалить трек c ID {props.licensorId}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} startIcon={<CancelIcon />} >
            Отменить
          </Button>
          <Button type="submit" variant="contained" startIcon={<DeleteIcon />} color="error">
            Удалить
          </Button>
        </DialogActions>
    </form>
  </BootstrapDialog>
  );
}
