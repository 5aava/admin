import {useState, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function Loader(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(props.open){
      setOpen(true)
    }else{
      setOpen(false)
    }
  }, [props])

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
