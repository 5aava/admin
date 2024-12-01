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

export default function UpdateUserDialogs(props) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/users/update', {
      id: props.user.id,
      name: data.get('name'),
      email: data.get('email'),
      role: data.get('role'),
      // password: data.get('password'),
      // confirm: data.get('confirm'),
    });
    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Данные пользователя обновлены', 'update');
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
              label="Имя"
              variant="outlined"
              id="name"
              type="name"
              name="name"
              defaultValue={props?.user?.name}
              required
              style={{marginBottom: 20, width: 400}}
            /><br />
            <TextField
              fullWidth
              label="Email"
              id="email"
              type="email"
              name="email"
              defaultValue={props?.user?.email}
              required
              variant="outlined"
              style={{marginBottom: 20}}
            /><br />
            <TextField
              select
              fullWidth
              label="Роль"
              variant="outlined"
              defaultValue={props?.user?.role}
              style={{marginBottom: 20}}
              name="role"
              id="role"
            >
              <MenuItem value={'admin'}>Админ</MenuItem>
              <MenuItem value={'moderator'}>Модератор</MenuItem>
              <MenuItem value={'manager'}>Менеджер</MenuItem>
              <MenuItem value={'finance'}>Финансист</MenuItem>
            </TextField><br />
           {/*  <TextField
              fullWidth
              label="Пароль"
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              variant="outlined"
              style={{marginBottom: 20}}
            /><br />
            <TextField
              fullWidth
              label="Подтвердить пароль"
              name="confirm"
              placeholder="••••••"
              type="password"
              id="confirm"
              required
              variant="outlined"
              style={{marginBottom: 20}}
            /> */}
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
