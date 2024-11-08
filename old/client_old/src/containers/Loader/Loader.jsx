import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 1000,
    color: '#ffffff',
  },
}));


export default function Loader (props) {
  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={props?.open || false}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
