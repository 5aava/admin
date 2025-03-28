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
import SaveIcon from '@mui/icons-material/Save';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function UpdateContractorDialog(props) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/contractors/update', {
      id: props.contractor.id,
      nickname: data.get('nickname'),
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      patronymic: data.get('patronymic'),
    });
    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Данные пользователя обновлены', 'update');

      // update all rows
      const r = await privateFetcher('/api/private/contractors/all', {});
      props.setNewRows(r.data);
    }

    if(response.status == 'error' && response.data == 'dublicate'){
      props.handleSnackbarOpen(response.data, 'error', 'Испольнитель с таким псевдонимом уже существует');
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
          {props.title}
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
            {props.text}<br /><br />
          </Typography>
            {props.form}
            <TextField
              fullWidth
              label="Псевдоним"
              id="nickname"
              name="nickname"
              required
              variant="outlined"
              defaultValue={props?.contractor?.nickname}
              style={{marginBottom: 20}}
            /><br />
            <TextField
              fullWidth
              label="Фамилия"
              id="lastname"
              name="lastname"
              required
              variant="outlined"
              defaultValue={props?.contractor?.lastname}
              style={{marginBottom: 20}}
            /><br />
            <TextField
              fullWidth
              label="Имя"
              id="firstname"
              name="firstname"
              required
              variant="outlined"
              defaultValue={props?.contractor?.firstname}
              style={{marginBottom: 20}}
            /><br />
            <TextField
              fullWidth
              label="Отчество"
              id="patronymic"
              name="patronymic"
              required
              variant="outlined"
              defaultValue={props?.contractor?.patronymic}
              style={{marginBottom: 20}}
            /><br />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} startIcon={<CancelIcon />} >
            Отменить
          </Button>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Обновить
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
