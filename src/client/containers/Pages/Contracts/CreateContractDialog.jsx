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
import DeleteIcon from '@mui/icons-material/Delete';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import InputMask from "react-input-mask";
import { NumericFormat } from 'react-number-format';


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
  const [maxWidth, setMaxWidth] = useState(500);
  const [linkValue, setLinkValue] = useState(null);


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
  const [inputContractorName2, setInputContractorName2] = useState({});
  const [inputContractorId2, setInputContractorId2] = useState('');
  
  const [dopContractorType, setDopContractorType] = useState('');
  const [dopContractorTax, setDopContractorTax] = useState("1.00");

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
    const response = await privateFetcher('/api/private/contracts/create', {
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
      link: linkValue,
    });
    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Договор добавлен', 'add');

      // update all rows
      const r = await privateFetcher('/api/private/contracts/all', {});
      props.setNewRows(r.data);
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
          {/* <Typography gutterBottom>
            {/* {props.text}<br /><br /> 
          </Typography>
            {props.form} */}
            <TextField
              fullWidth
              label="Номер договора"
              id="sku"
              name="sku"
              required
              variant="outlined"
              style={{marginBottom: 20, width: maxWidth}}
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
                id="releaseDate"
                name="releaseDate"
                required
                variant="outlined"
                width={maxWidth}
                format="DD.MM.YYYY"
                sx={{ 
                  minWidth: maxWidth,
                  marginBottom: 2
                 }}
               />
            </LocalizationProvider><br />

            <Divider />

            <Typography sx={{ m: 0, p: 2 }} variant='h6'>
              Добавить исполнителей
            </Typography>

            <TextField
              select
              fullWidth
              label="Выбрать тип"
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
              <MenuItem value={'Музыка'}>Музыка</MenuItem>
              <MenuItem value={'Текст'}>Текст</MenuItem>
              <MenuItem value={'Исполнитель'}>Исполнитель</MenuItem>
              <MenuItem value={'Сведение'}>Сведение</MenuItem>
              <MenuItem value={'Жесткий процент'}>Жесткий процент</MenuItem>
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
                    label="Ф.И.О."
                  />
                )
              }
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
               }}
            />

            <NumericFormat 
              id="outlined-basic"
              label="Процент %"
              variant="outlined"
              value={dopContractorTax}
              customInput={TextField}
              isAllowed={(values) => {
                const { floatValue } = values;
                return floatValue <= 100;
              }}
              decimalScale={2}
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
              defaultValue={0}
            >
              <MenuItem value={0}>0 %</MenuItem>
              <MenuItem value={6}>6 %</MenuItem>
            </TextField><br />

            <TextField 
              id="isrc"
              name="isrc"
              label="ISRC" 
              variant="outlined"
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
              sx={{ 
                minWidth: maxWidth,
                marginBottom: 2
               }}
            /><br />

            <InputMask
              mask="https://b\and.link/**************************"
              value={linkValue}
              disabled={false}
              maskChar={' '}
              alwaysShowMask={true}
              onChange={(e) => setLinkValue(e.target.value)}
            >
              {() => <TextField 
                        id="link"
                        name="link"
                        label="Сылка на релиз"
                        sx={{
                          minWidth: maxWidth,
                          marginBottom: 2
                        }} />}
            </InputMask>

            {/* 
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
                minWidth: maxWidth,
                marginBottom: 2
               }}
            >
              Подгрузить PDF
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
              />
            </Button> 
            */}
            
        
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} startIcon={<CancelIcon />}  >
            Отменить
          </Button>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />} >
            Сохранить
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
