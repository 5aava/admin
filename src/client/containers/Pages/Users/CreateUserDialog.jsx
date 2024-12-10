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

export default function AddUserDialogs(props) {
  
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
      // snackbarOpenSet(true)
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
      // snackbarOpenSet(true)
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/users/create', {
      name: data.get('name'),
      email: data.get('email'),
      role: data.get('role'),
      password: data.get('password'),
      confirm: data.get('confirm'),
    });
    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Пользователь добавлен', 'add');
    }

    if(response.status == 'error'){
      props.handleSnackbarOpen(response.data, 'error', 'Пользователь не добавлен');
    }

    if(response.status == 'error' && response.data == 'dublicate'){
      props.handleSnackbarOpen(response.data, 'error', 'Пользователь с таким Email уже существует');
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
              required
              style={{marginBottom: 20, width: 400}}
            /><br />
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              fullWidth
              label="Email"
              id="email"
              type="email"
              name="email"
              required
              variant="outlined"
              style={{marginBottom: 20}}
            /><br />
            <TextField
              select
              fullWidth
              label="Роль"
              variant="outlined"
              style={{marginBottom: 20}}
              name="role"
              id="role"
              defaultValue={'manager'}
            >
              <MenuItem value={'admin'}>Админ</MenuItem>
              <MenuItem value={'moderator'}>Модератор</MenuItem>
              <MenuItem value={'manager'}>Менеджер</MenuItem>
              <MenuItem value={'finance'}>Финансист</MenuItem>
            </TextField><br />
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
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
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} startIcon={<CancelIcon />}  >
            Отменить
          </Button>
          <Button 
            onClick={validateInputs} 
            type="submit" 
            variant="contained" 
            startIcon={<SaveIcon />} >
            Добавить
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
