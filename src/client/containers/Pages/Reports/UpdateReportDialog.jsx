import {useState, useEffect} from 'react';

import useFetch from "../../../modules/useFetch";
import privateFetcher from '../../../modules/privateFetcher';

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

import Autocomplete from '@mui/material/Autocomplete';
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

export default function UpdateTrackDialog(props) {
  const [contractors, setContractors] = useState([]);
  const [inputContractorName, setInputContracortName] = useState({});
  const [inputContractorId, setInputContracortId] = useState('');

  const [constr] = useFetch("/api/private/contractors/all", {});
  useEffect(() => {
    if(constr) {

      const newContractors = constr.map(item => {
        return {
          id: item.id,
          title: `${item.lastname} ${item.firstname} ${item.patronymic} (${item.nickname})`
        }
      });

      setContractors(newContractors);
    }
  }, [constr])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/reports/update', {
      id: props.track.id,
      name: data.get('name'),
      contractorId: inputContractorId
    });
    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Данные трека обновлены', 'update');

      // update all rows
      const r = await privateFetcher('/api/private/reports', {});
      props.setNewRows(r.data);
    }

    if(response.status == 'error' && response.data == 'dublicate'){
      props.handleSnackbarOpen(response.data, 'error', 'Трек с таким названием уже существует');
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
              label="Название"
              id="name"
              name="name"
              required
              variant="outlined"
              defaultValue={props?.track?.name}
              style={{marginBottom: 20}}
            /><br />
            <Autocomplete
              disablePortal
              options={contractors}
              id="contractorId"
              name="contractorId"
              inputValue={inputContractorName}
              // defaultValue={}
              getOptionLabel={(option) => {
                setInputContracortId(option.id);
                return option.title;
              }}
              onInputChange={(event, newInputValue) => {
                // console.log(newInputValue);
                setInputContracortName(newInputValue);
              }}
              renderInput={(params) => 
                <TextField 
                  {...params}
                  label="Исполнители" 
                />}
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
