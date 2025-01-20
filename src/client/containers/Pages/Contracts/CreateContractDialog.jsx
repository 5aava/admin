import {useState, useEffect} from 'react';

import useFetch from "../../../modules/useFetch";
import privateFetcher from '../../../modules/privateFetcher';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



export default function CreateTrackDialog(props) {
  const [contractors, setContractors] = useState([]);
  const [inputContractorName, setInputContracortName] = useState({});
  const [inputContractorId, setInputContracortId] = useState('');

  const [licensors, setLicensors] = useState([]);
  const [inputLicensorName, setInputLicensorName] = useState({});
  const [inputLicensorId, setInputLicensorId] = useState('');

  const [tracks, setTracks] = useState([]);
  const [inputTrackName, setInputTrackName] = useState({});
  const [inputTrackId, setInputTrackId] = useState('');

  const [contractors2, setContractors2] = useState([]);
  const [inputContractorName2, setInputContracortName2] = useState({});
  const [inputContractorId2, setInputContracortId2] = useState('');
  
  const [dopContractorType, setDopContractorType] = useState('music');
  const [dopContractorTax, setDopContractorTax] = useState(0);

  const [dopContractors, setDopContractors] = useState([]);
  

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

  const handleAddContractors = async () => {
    const dopContrs = dopContractors.map(item => item);

    dopContrs.push({
      id: inputContractorId2,
      name: inputContractorName2,
      type: dopContractorType,
      tax: dopContractorTax
    });

    console.log(dopContractors);
    
    setDopContractors(dopContrs);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/contracts/create', {
      sku: data.get('sku'),
      contractorId: inputContractorId,
      licensorId: inputLicensorId,
      trackId: inputTrackId
    });

    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Договор добавлен', 'add');
    }

    if(response.status == 'error'){
      props.handleSnackbarOpen(response.data, 'error', 'Договор не добавлен');
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
            {/* {props.text}<br /><br /> */}
          </Typography>
            {props.form}
            <TextField
              fullWidth
              label="Номер договора"
              id="sku"
              name="sku"
              required
              variant="outlined"
              style={{marginBottom: 20, width: 400}}
            /><br />

            <Autocomplete
              disablePortal
              required
              options={contractors}
              id="contractorId"
              name="contractorId"
              inputValue={inputContractorName}
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

            { inputContractorId && (
              <>
                <Autocomplete
                  disablePortal
                  options={tracks}
                  id="trackId"
                  name="trackId"
                  inputValue={inputTrackName}
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
              )}

            <Autocomplete
              disablePortal
              required
              options={licensors}
              id="licensorId"
              name="licensorId"
              inputValue={inputLicensorName}
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
                id="date"
                name="date"
                required
                variant="outlined"
                width={400}
                format="DD.MM.YYYY"
                sx={{ 
                  minWidth: 400,
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
                minWidth: 400,
                marginBottom: 2
               }}
              name="author"
              id="author"
              defaultValue={'music'}
              onChange={(e) => setDopContractorType(e.target.value)}
            >
              <MenuItem value={'music'}>Автор музыки</MenuItem>
              <MenuItem value={'text'}>Автор текста</MenuItem>
              <MenuItem value={'singer'}>Певец</MenuItem>
            </TextField><br />

            <Autocomplete
              disablePortal
              required
              options={contractors2}
              id="contractorId2"
              name="contractorId2"
              inputValue={inputContractorName2}
              getOptionLabel={(option) => {
                setInputContracortId2(option.id);
                return option.title;
              }}
              onInputChange={(event, value) => {
                setInputContracortName2(value);
              }}
              renderInput={(params) => (
                  <TextField 
                    {...params}
                    label="Доп. исполнитель" 
                  />
                )
              }
              sx={{ 
                minWidth: 400,
                marginBottom: 2
               }}
            />

            <TextField 
              required
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
                Добавлены исполнители: <br />
                {
                  dopContractors.map(item => {
                    return <>{item.type} - {item.name} {item.tax}% <br /></>
                  })
                }
              </>
            ): null}


            <Divider sx={{ marginBottom: 2 }} />

            <TextField
              select
              fullWidth
              label="Налог 0% или 6%"
              variant="outlined"
              sx={{ 
                minWidth: 400,
                marginBottom: 2
               }}
              name="tax"
              id="tax"
              defaultValue={'0'}
            >
              <MenuItem value={'0'}>0 %</MenuItem>
              <MenuItem value={'6'}>6 %</MenuItem>
            </TextField><br />

            <TextField 
              id="ISRC" 
              label="ISRC" 
              variant="outlined"
              sx={{ 
                minWidth: 400,
                marginBottom: 2
               }}
            /><br />

            <TextField 
              id="UPC" 
              label="UPC" 
              variant="outlined"
              sx={{ 
                minWidth: 400,
                marginBottom: 2
               }}
            /><br />

            <TextField 
              id="Link" 
              label="Сылка на релиз" 
              variant="outlined"
              sx={{ 
                minWidth: 400,
                marginBottom: 2
               }}
            /><br />

            <Divider />

            <Typography sx={{ m: 0, p: 2 }} variant='h6'>
              Подгрузить PDF файл договора
            </Typography>

            <Button
              component="label"
              role={undefined}
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ 
                minWidth: 400,
                marginBottom: 2
               }}
            >
              Подгрузить PDF
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
              />
            </Button>
            
        
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} startIcon={<CancelIcon />}  >
            Отменить
          </Button>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />} >
            Отправить на модерацию
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}

/* 

- Номер договора (текстовое поле)                         +         
- Один Главный исполнитель                                +         
- Один трек исполнителя                                   +
- Один лицензиар                                          +
- Дата релиза (календарь)                                 +

- Добавить исполнителя (+)                                +
  - Кнопка добавить                                       +
  - Исполнитель                                           +
  - Выбор (певец, автор текста, автор музыки)             +
  - процентная ставка                                     +
  - Кнопка удалить                                        +

- Налог (0% или 6%)                                       +
- вручную вносим ISRC (текстовое поле)                    +
- вручную вносим UPC (текстовое поле)                     +
- вручную вносим "Ссылка на релиз" (текстовое поле)       +

-	подгружаем PDF файл                                     +
-	Сохраняем, отправляем на Модерацию                      

Осталось
- Показывать какие добавлены испонители                   +
- Сохранять значения в базе                               
- Удаляем доп. исполнителя            
- В таблице показываем доп. исполителей
- В таблице поправить формат даты

*/
