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

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function UpdateContractDialog(props) {
  const [maxWidth, setMaxWidth] = useState(500);

  const [contractors, setContractors] = useState([]);
  const [inputContractorName, setInputContractorName] = useState({});
  const [inputContractorId, setInputContractorId] = useState('');

  const [licensors, setLicensors] = useState([]);
  const [inputLicensorName, setInputLicensorName] = useState({});
  const [inputLicensorId, setInputLicensorId] = useState('');

  const [tracks, setTracks] = useState([]);
  const [inputTrackName, setInputTrackName] = useState({});
  const [inputTrackId, setInputTrackId] = useState('');

  const [contractors2, setContractors2] = useState([]);
  const [inputContractorName2, setInputContractorName2] = useState({});
  const [inputContractorId2, setInputContractorId2] = useState('');
  
  const [dopContractorType, setDopContractorType] = useState('');
  const [dopContractorTax, setDopContractorTax] = useState(0);

  const [dopContractors, setDopContractors] = useState(props.contract?.dopContractors);
  

  const [constr] = useFetch("/api/private/contractors/all", {});
  const [trks] = useFetch("/api/private/tracks/all", {});
  const [licensrs] = useFetch("/api/private/licensors/all", {});

  useEffect(() => {
    if(constr) {

      const newContractors = constr.map(item => {
        return {
          id: item.id,
          title: `${item.lastname} ${item.firstname} ${item.patronymic} (${item.nickname})`
        }
      });

      setContractors(newContractors);
      setContractors2(newContractors);
    }
    
    if(licensrs) {
      const newLicensors = licensrs.map(item => {
        return { id: item.id, title: item.name }
      });
      setLicensors(newLicensors);
    }

    if(trks) {
      const newTracks = trks.map(item => {
        return { id: item.id, title: item.name }
      });
      setTracks(newTracks);
    }

  }, [constr, licensrs, trks]);

  
  const handleAddContractors = async () => {
    const dopContrs = dopContractors.map(item => item);

    // не добавлять пустого исполнителя
    if(!inputContractorId2 || !inputContractorName2 || !dopContractorType || dopContractorTax == 0){
      return false;
    }

    // не добавлять дважды одного и того же исполнителя
    if(dopContrs.find(({ id }) => id === inputContractorId2)){
      return false;
    };


    dopContrs.push({
      id: inputContractorId2,
      name: inputContractorName2,
      type: dopContractorType,
      tax: dopContractorTax
    });

    // console.log(dopContractors);
    
    setDopContractors(dopContrs);
  }

  const handleDeleteContractors = async (id) => {
    const dopContrs = dopContractors.map(item => item);
    const filtered = dopContrs.filter(function(el) { return el.id != id; }); 
    setDopContractors(filtered);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/contracts/update', {
      id: props.contract.id,
      sku: data.get('sku'),
      contractorId: inputContractorId,
      licensorId: inputLicensorId,
      trackId: inputTrackId,
      releaseDate: data.get('releaseDate'),
      // =======================
      contractors: JSON.stringify(dopContractors),
      tax: data.get('tax'),
      isrc: data.get('isrc'),
      upc: data.get('upc'),
      link: data.get('link'),
      moderated: data.get('moderated'),
    });

    console.log(data.get('sku'));
    console.log(response);

    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Данные договора обновлены', 'update');
    }

    if(response.status == 'error' && response.data == 'dublicate'){
      props.handleSnackbarOpen(response.data, 'error', 'Договор с таким номером уже существует');
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
            {/* //{props.text}<br /><br /> */}
          </Typography>
            {props.form}
            <TextField
              fullWidth
              label="Номер договора"
              id="sku"
              name="sku"
              required
              variant="outlined"
              defaultValue={props?.contract?.sku}
              style={{marginBottom: 20}}
            /><br />
            
            <Autocomplete
              disablePortal
              required
              options={contractors}
              id="contractorId"
              name="contractorId"
              inputValue={inputContractorName}
              defaultValue={{ 
                id: props?.contract?.contractorId, 
                title: props?.contract?.contractor 
              }}
              getOptionLabel={(option) => {
                setInputContractorId(option.id);
                return option.title;
              }}
              onInputChange={(event, value) => {
                setInputContractorName(value);
              }}
              renderInput={(params) => 
                <TextField 
                  {...params}
                  label="Главный исполнитель" 
                />}
            /><br />

            <Autocomplete
              disablePortal
              required
              options={tracks}
              id="trackId"
              name="trackId"
              inputValue={inputTrackName}
              defaultValue={{ 
                id: props?.contract?.trackId, 
                title: props?.contract?.track 
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


            <Autocomplete
              disablePortal
              required
              options={licensors}
              id="licensorId"
              name="licensorId"
              inputValue={inputLicensorName}
              defaultValue={{ 
                id: props?.contract?.licensorId, 
                title: props?.contract?.licensor
              }}
              getOptionLabel={(option) => {
                setInputLicensorId(option.id);
                return option.title;
              }}
              onInputChange={(event, value) => {
                setInputLicensorName(value);
              }}
              renderInput={(params) => 
                <TextField 
                  {...params}
                  label="Лицензиар" 
                />}
            /><br />

            <LocalizationProvider 
              dateAdapter={AdapterDayjs}
            >
              <DatePicker
                label="Дата релиза" 
                fullWidth
                id="releaseDate"
                name="releaseDate"
                required
                variant="outlined"
                width={maxWidth}
                format="DD.MM.YYYY"
                defaultValue={dayjs(props?.contract?.date, 'DD.MM.YYYY')}
                sx={{ 
                  minWidth: maxWidth,
                  marginBottom: 2
                 }}
               />
            </LocalizationProvider><br />

            <Divider />

            <Typography sx={{ m: 0, p: 2 }} variant='h6'>
              Добавить автора или певца
            </Typography>

            <TextField
              select
              fullWidth
              label="Автор или певец"
              variant="outlined"
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
               }}
              name="author"
              id="author"
              defaultValue={''}
              onChange={(e) => setDopContractorType(e.target.value)}
            >
              <MenuItem value={'Музыка'}>Автор музыки</MenuItem>
              <MenuItem value={'Текст'}>Автор текста</MenuItem>
              <MenuItem value={'Певец'}>Певец</MenuItem>
            </TextField><br />

            <Autocomplete
              disablePortal
              options={contractors2}
              id="contractorId2"
              name="contractorId2"
              inputValue={inputContractorName2}
              getOptionLabel={(option) => {
                setInputContractorId2(option.id);
                return option.title;
              }}
              onInputChange={(event, value) => {
                setInputContractorName2(value);
              }}
              renderInput={(params) => (
                  <TextField 
                    {...params}
                    label="Доп. исполнитель" 
                  />
                )
              }
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
               }}
            />

            <TextField 
              id="outlined-basic" 
              label="Доля в %" 
              variant="outlined"
              sx={{ 
                width: 150,
                marginBottom: 2,
                marginRight: 2,
               }}
               type="number"
               onChange={(e) => setDopContractorTax(e.target.value)}
            />


            <Button 
              color="primary" 
              startIcon={<AddIcon />} 
              onClick={() => handleAddContractors()} 
              sx={{ m: 0, p: 2 }}
            >
              Добавить
            </Button><br />

            {dopContractors.length ? (
              <>
                <Typography variant='h6' sx={{color: '#00AA00'}}>Добавленые исполнители: </Typography>
                <Stack >
                {
                  dopContractors.map((item, key) => {
                    return <Chip sx={{margin:'1px', p: '1px'}} key={key} label={`${item.type} ${item.tax}% - ${item.name}`} 
                        onDelete={() => handleDeleteContractors(item.id)} />
                  })
                } </Stack>
              </>
            ): null}


            <Divider sx={{ margin: 2 }} />

            <TextField
              select
              fullWidth
              label="Налог 0% или 6%"
              variant="outlined"
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
              }}
              name="tax"
              id="tax"
              defaultValue={props?.contract?.tax}
            >
              <MenuItem value={0}>0 %</MenuItem>
              <MenuItem value={6}>6 %</MenuItem>
            </TextField><br />

            <TextField 
              id="isrc"
              name="isrc"
              label="ISRC" 
              variant="outlined"
              defaultValue={props?.contract?.isrc}
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
              }}
            /><br />

            <TextField 
              id="upc"
              name="upc"
              label="UPC" 
              variant="outlined"
              defaultValue={props?.contract?.upc}
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
              }}
            /><br />

            <TextField 
              id="link"
              name="link"
              label="Сылка на релиз" 
              variant="outlined"
              defaultValue={props?.contract?.link}
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
              }}
            /><br />

            <Divider />

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography sx={{ m: 0, p: 2 }} variant='h6'>
                Отправить на модерацию?
              </Typography>
              <Typography>Нет</Typography>
              <Switch 
                id="moderated"
                name="moderated"
                defaultChecked 
              />
              <Typography>Да</Typography>
            </Stack>


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
