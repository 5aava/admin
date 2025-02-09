import {useState, useEffect} from 'react';
import dayjs from 'dayjs';

import useFetch from "../../../modules/useFetch";
import privateFetcher from '../../../modules/privateFetcher';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function UpdateIncomesDialog(props) {
  const [maxWidth, setMaxWidth] = useState(500);

  const [contractors, setContractors] = useState([]);
  const [inputContractorName, setInputContracortName] = useState({});
  const [inputContractorId, setInputContracortId] = useState(props.income?.contractorId);

  const [tracks, setTracks] = useState([]);
  const [inputTrackName, setInputTrackName] = useState({});
  const [inputTrackId, setInputTrackId] = useState(props.payment?.trackId);

  const [constr] = useFetch("/api/private/contractors/all", {});
  const [trks] = useFetch("/api/private/tracks/all", {});

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

    if(trks) {
      const newTracks = trks.map(item => {
        return { id: item.id, title: item.name }
      });
      setTracks(newTracks);
    }

  }, [constr, trks]);

  useEffect(() => {
    if(inputContractorId){
      const newTracks = []
      trks.forEach(item => {
        if(inputContractorId == item.contractorId){
          newTracks.push( { id: item.id, title: item.name })
        }
      })
      setTracks(newTracks);
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/incomes/update', {
      id: props.income.id,
      contractorId: inputContractorId,
      trackId: inputTrackId,
      year: data.get('year'),
      q1: data.get('q1'),
      q2: data.get('q2'),
      q3: data.get('q3'),
      q4: data.get('q4'),
      comment: data.get('comment'),
    });
    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Данные обновлены', 'update');
    }

    if(response.status == 'error' && response.data == 'dublicate'){
      props.handleSnackbarOpen(response.data, 'error', 'Запись с таким id уже существует');
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


        <Autocomplete
              disablePortal
              required
              options={contractors}
              id="contractorId"
              name="contractorId"
              inputValue={inputContractorName}
              defaultValue={{ 
                id: props?.income?.contractorId, 
                title: props?.income?.contractor 
              }}
              getOptionLabel={(option) => {
                setInputContracortId(option.id);
                return option.title;
              }}
              onInputChange={(event, value) => {
                setInputContracortName(value);
              }}
              renderInput={(params) => 
                <TextField 
                  {...params}
                  label="Главный исполнитель" 
                />}
            /><br />

              <>
                <Autocomplete
                  disablePortal
                  options={tracks}
                  id="trackId"
                  name="trackId"
                  inputValue={inputTrackName}
                  defaultValue={{ 
                    id: props?.income?.trackId, 
                    title: props?.income?.track 
                  }}
                  getOptionLabel={(option) => {
                    setInputTrackId(option.id);
                    return option.title;
                  }}
                  onInputChange={(event, value) => {
                    setInputTrackName(value);
                  }}
                  renderInput={(params) => 
                    <TextField 
                      {...params}
                      label="Трек исполнителя" 
                    />}
                /><br />
                </>

          <LocalizationProvider 
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              views={['year']}
              label="Год" 
              fullWidth
              id="year"
              name="year"
              required
              format="YYYY"
              defaultValue={dayjs('01.01.' + props?.income?.year, 'DD.MM.YYYY')}
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
                }}
              />
          </LocalizationProvider><br />

          <TextField
            fullWidth
            label="Доход за I квартал"
            id="q1"
            name="q1"
            type="number"
            variant="outlined"
            defaultValue={props?.income?.q1}
            onWheel={(e) => e.target.blur()} 
            style={{marginBottom: 20, width: maxWidth}}
          /><br />

          <TextField
            fullWidth
            label="Доход за II квартал"
            id="q2"
            name="q2"
            type="number"
            variant="outlined"
            defaultValue={props?.income?.q2}
            onWheel={(e) => e.target.blur()} 
            style={{marginBottom: 20, width: maxWidth}}
          /><br />

          <TextField
            fullWidth
            label="Доход за III квартал"
            id="q3"
            name="q3"
            type="number"
            variant="outlined"
            defaultValue={props?.income?.q3}
            onWheel={(e) => e.target.blur()} 
            style={{marginBottom: 20, width: maxWidth}}
          /><br />

          <TextField
            fullWidth
            label="Доход за IV квартал"
            id="q4"
            name="q4"
            type="number"
            variant="outlined"
            defaultValue={props?.income?.q4}
            onWheel={(e) => e.target.blur()} 
            style={{marginBottom: 20, width: maxWidth}}
          /><br />

          <TextField
            fullWidth
            label="Коментарий"
            id="comment"
            name="comment"
            variant="outlined"
            defaultValue={props?.income?.comment}
            style={{marginBottom: 20, width: maxWidth}}
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
