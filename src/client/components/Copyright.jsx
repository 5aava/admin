import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Все права защищены © '}
      <MuiLink color="inherit" href="http://127.0.0.1/">
        Платформа
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
