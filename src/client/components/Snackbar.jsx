import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function CustomizedSnackbars(props) {
  return (
    <div>
      <Snackbar 
        open={props.open} 
        autoHideDuration={2000} 
        onClose={props.close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={props.close}
          severity={props.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
