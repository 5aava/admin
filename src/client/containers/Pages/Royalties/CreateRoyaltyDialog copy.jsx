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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';


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
  const [maxWidth, setMaxWidth] = useState(516);

  const [contractors, setContractors] = useState([]);
  const [inputContractorName, setInputContracortName] = useState({});
  const [inputContractorId, setInputContracortId] = useState('');

  const [tracks, setTracks] = useState([]);
  const [inputTrackName, setInputTrackName] = useState({});
  const [inputTrackId, setInputTrackId] = useState('');

  const [yearsData, setYearsData] = useState([]);


  const [yearsChecked, setYearsChecked] = useState([]);
  

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

  
  const handleYearsData = async (trackName) => {
    const track = tracks.find(o => o.title === trackName);
    const trackId = track?.id;

    if(!trackId) return false;

    const data = await privateFetcher(`/api/private/incomes/all`, {
      contractorId: inputContractorId,
      trackId: trackId,
    }).then(result => result.data);
    
    if(!data) return false;

    setYearsData(data);
    console.log(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/contracts/create', {
      sku: data.get('sku'),
      contractorId: inputContractorId,
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
      maxWidth="lg"
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
              sx={{width: maxWidth}}
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
                    handleYearsData(value);
                  }}
                  renderInput={(params) => 
                    <TextField 
                      {...params}
                      label="Трек исполнителя" 
                    />}
                /><br />
                </>
              )}

            {
              yearsData.length > 0 ?
              <>
                <Divider />

                <Typography sx={{  }} variant='h6'>
                  Выберите года и кварталы (Доходы)
                </Typography>
                <Table sx={{ minWidth: maxWidth, m: 0, p: 0 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Год</TableCell>
                      <TableCell align="right">I квартал</TableCell>
                      <TableCell align="right">II квартал</TableCell>
                      <TableCell align="right">III квартал</TableCell>
                      <TableCell align="right">IV квартал</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {yearsData.map(row => 
                    <TableRow
                      key={row.year}
                    >
                      <TableCell component="th" scope="row">
                        {row.year} 
                        <Checkbox /* onChange={handleChange} */
                        />
                      </TableCell>
                      <TableCell align="right">{row.q1} <Checkbox disabled/></TableCell>
                      <TableCell align="right">{row.q2} <Checkbox disabled/></TableCell>
                      <TableCell align="right">{row.q3} <Checkbox disabled/></TableCell>
                      <TableCell align="right">{row.q4} <Checkbox disabled/></TableCell>
                    </TableRow>
                  )}
                  </TableBody>
                </Table> 
              </> : 
              <Typography sx={{ m: 0, p: 2 }} variant='body'>
                Нет записи в таблице Доходов
              </Typography>
            }

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
