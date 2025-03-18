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

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';


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
  const [personName, setPersonName] = useState([]);
  const [saveTracksRequest, setSaveTracksRequest] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const srq = {
      contractorId: inputContractorId,
      tracks: saveTracksRequest
    };

    // const data = new FormData(event.currentTarget);
    const response = await privateFetcher('/api/private/royalties/create', srq);
    
    if(response.status == 'ok'){
      props.close();
      props.handleSnackbarOpen(response.data, 'success', 'Запись добавлена', 'add');

      // update all rows
      const r = await privateFetcher('/api/private/royalties', {});
      props.setNewRows(r.data);
    }

    if(response.status == 'error'){
      props.handleSnackbarOpen(response.data, 'error', 'Запись не добавлена');
    }

    if(response.status == 'error' && response.data == 'dublicate'){
      props.handleSnackbarOpen(response.data, 'error', 'Запись с таким номером уже существует');
    }

  }


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleLoadIncomes = async () => {
    const trackIdArray = personName.map(i => {
      const track = tracks.find(o => o.title === i);
      return track?.id;
    })
  
    const data = await privateFetcher(`/api/private/incomes/all`, {
      contractorId: inputContractorId,
      trackIdArray: trackIdArray
    }).then(result => result.data);
    
    if(!data) return false;

    console.log(data);
    setYearsData(data);
  }

  const handleCheckboxes = async (e, trackId, year, q) => {

    const obj = {
      checked: e.target.checked,
      trackId: trackId,
      year: year,
      q: q
    }

    const sr = saveTracksRequest.map(i => i);

    // add
    if(e.target.checked){
      const result = sr.find(o => {
        if( o?.checked === e.target.checked && 
            o?.trackId === trackId && 
            o?.year === year &&
            o?.q === q 
          ){
          return o;
        }
      });

      // add
      if(!result){
        sr.push(obj);
        console.log(sr);
        setSaveTracksRequest(sr);
      } 
    }

    // delete
    if(!e.target.checked){
      const filtered = sr.filter(el => {
        if(el?.trackId === trackId && 
           el?.year == year &&
           el?.q == q 
        ){
          return false;
        }else{
          return el;
        }
      }); 
      console.log(filtered);
      setSaveTracksRequest(filtered);
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
              setPersonName([]);
            }}
            renderInput={(params) => 
              <TextField 
                {...params}
                label="Главный исполнитель" 
              />}
          /><br />

          { inputContractorId && (
            <>
              <FormControl sx={{ m: 0, width: maxWidth }}>
                <InputLabel id="demo-multiple-checkbox-label">Выберите треки</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  name="Главный исполнитель"
                  multiple
                  value={personName}
                  input={<OutlinedInput label="Выберите треки" />}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(', ')}
                  // MenuProps={MenuProps}
                  sx={{width: maxWidth}}
                >
                  {tracks.map((track) => (
                    <MenuItem key={track.title} value={track.title}>
                      <Checkbox checked={personName.includes(track.title)} />
                      <ListItemText primary={track.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <br /><br />
              <Button onClick={handleLoadIncomes} variant='contained' sx={{m:1, width: maxWidth}}>
                Подгрузить из таблицы Доходов
              </Button>
            </>

          )}

          {yearsData && yearsData.length > 0 ?
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
                    <>
                    <TableRow  >
                      <TableCell component="th" scope="row" colSpan={4}>
                        <Typography >Трек - {row.track}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow key={row.year} >
                      <TableCell component="th" scope="row">
                        {row.year}
                      </TableCell>
                      <TableCell align="right">{row.q1} 
                        <Checkbox 
                          disabled={!row.q1 ? true : false }
                          onChange={(e) => handleCheckboxes(e, row.trackId, row.year, 1)}
                        />
                      </TableCell>
                      <TableCell align="right">{row.q2} 
                        <Checkbox 
                          disabled={!row.q2 ? true : false }
                          onChange={(e) => handleCheckboxes(e, row.trackId, row.year, 2)}
                        />
                      </TableCell>
                      <TableCell align="right">{row.q3}
                        <Checkbox 
                          disabled={!row.q3 ? true : false }
                          onChange={(e) => handleCheckboxes(e, row.trackId, row.year, 3)}
                        />
                      </TableCell>
                      <TableCell align="right">{row.q4}
                        <Checkbox 
                          disabled={!row.q4 ? true : false }
                          onChange={(e) => handleCheckboxes(e, row.trackId, row.year, 4)}
                        />
                      </TableCell>
                    </TableRow>
                    </>
                  )}
                  </TableBody>
                </Table> 
              </> : null
            }

        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} startIcon={<CancelIcon />}  >
            Отменить
          </Button>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />} >
            Расчитать
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
