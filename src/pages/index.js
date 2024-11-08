import { useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import Copyright from '../client/components/Copyright';
import Card from '../client/components/Card';
import Snackbar from '../client/components/Snackbar';
import Dialog from '../client/components/Dialog';


export default function Index() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [snackbarOpen, snackbarOpenSet] = useState(false);
  const [dialogOpen, dialogOpenSet] = useState(false);

  const router = useRouter()


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    snackbarOpenSet(false);
  };

  const handleDialogClose = () => {
    dialogOpenSet(false);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const response = await axios.post('/api/auth', {
      email: data.get('email'),
      password: data.get('password'),
    });

    if(response.data?.auth == false){
      localStorage.removeItem('x-api-key');
      snackbarOpenSet(true);
    }

    if(response.data?.auth == true){
      localStorage.setItem('x-api-key', response.data?.jwt);
      router.push('/main')
    }

  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
      snackbarOpenSet(true)
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
      snackbarOpenSet(true)
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" align={'center'} component="h1" sx={{ mb: 4 }}>
          Платформа расчетов
        </Typography>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Войти
          </Typography>

        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Пароль</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={()=> dialogOpenSet(true)}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Забыли пароль?
                </Link>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                sx={{ mb: 3 }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Войти
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Нет аккаунта?{' '}
              <span>
                <Link
                  // href="/material-ui/getting-started/templates/sign-in/"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                  onClick={()=> dialogOpenSet(true)}
                  style={{cursor:'pointer'}}
                >
                  Запросить
                </Link>
              </span>
            </Typography>
          </Box>
        
        </Card>
      </Box>
      <Copyright />

      <Snackbar 
        open={snackbarOpen} 
        close={handleSnackbarClose} 
        type={'error'}
        text={"Ошибка: Логин и пароль указаны не верно!"}
      />

      <Dialog 
        open={dialogOpen} 
        close={handleDialogClose} 
      />
    </Container>
  );
}
