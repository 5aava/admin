import {useState, useEffect} from 'react';

import useFetch from "../../../modules/useFetch";

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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function UpdateTrackDialog(props) {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);

  const [royaltyData] = useFetch(`/api/private/royalties/${props?.royalty?.id}`, {});

  useEffect(() => {
    if(royaltyData) {
      setData(royaltyData);
    }
  }, [royaltyData]);


  return (
    <BootstrapDialog
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth="lg"
    >
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
            {!data?.id &&
                <Backdrop
                sx={() => ({ zIndex: 1000 + 1 })}
                open={loader}
                onClick={() => setLoader(false)}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            }

            {data?.id &&
            <>
            <Typography sx={{ m: 1 }} variant='h5'>
              {data.contractor} от {data.date}
            </Typography>
            <Divider />
            <Table sx={{ m: 0, p: 0 }} aria-label="simple table">
              <TableBody>

                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Общий расчет
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Общ ВАЛ</TableCell>
                  <TableCell align="right"><b>{data?.total?.totalValByYears}</b></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Общ ВАЛ минус УСН</TableCell>
                  <TableCell align="right"><b>{data?.total?.valMinusUsn}</b></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Общ ВАЛ газ.</TableCell>
                  <TableCell align="right"><b>{data?.total?.valForGaz}</b></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Общ ВАЛ исп.<Backdrop /></TableCell>
                  <TableCell align="right"><b>{data?.total?.valForContractors}</b></TableCell>
                </TableRow>

                {
                  data?.tracks?.map(track => (
                    <>
                    <TableRow>
                      <TableCell align="center" colSpan={4}>
                        <Typography sx={{ m: 1 }} variant='h6'>
                          Информация по треку - <b>{track.trackName}</b>
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Название трека</TableCell>
                      <TableCell align="right"><b>{track.trackName}</b></TableCell>
                      <TableCell>ВАЛ</TableCell>
                      <TableCell align="right"><b>{track.trackTotal.totalValByYears}</b></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Номер договора</TableCell>
                      <TableCell align="right"><b>{track.contrackSku}</b></TableCell>
                      <TableCell>ВАЛ минус УСН</TableCell>
                      <TableCell align="right"><b>{track.trackTotal.valMinusUsn}</b></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Налог УНС</TableCell>
                      <TableCell align="right"><b>{track.usnTax} %</b></TableCell>
                      <TableCell>ВАЛ газ.</TableCell>
                      <TableCell align="right"><b>{track.trackTotal.valForGaz}</b></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell>ВАЛ исп.</TableCell>
                      <TableCell align="right"><b>{track.trackTotal.valForContractors}</b></TableCell>
                    </TableRow>
                    
                    {
                      track?.dopContractors?.map(dc => (
                        <>
                          <TableRow>
                            <TableCell colSpan={6}>
                              {dc.dopContractorName} - {dc.type} {dc.percent} %
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="center">Год </TableCell>
                            <TableCell align="center">I квартал</TableCell>
                            <TableCell align="center">II квартал</TableCell>
                            <TableCell align="center">III квартал</TableCell>
                            <TableCell align="center">IV квартал</TableCell>
                            <TableCell align="center">Итого </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell align="center">{dc.year}</TableCell>
                            <TableCell align="right">{dc.q1}</TableCell>
                            <TableCell align="right">{dc.q2}</TableCell>
                            <TableCell align="right">{dc.q3}</TableCell>
                            <TableCell align="right">{dc.q4}</TableCell>
                            <TableCell align="right">{dc.total}</TableCell>
                          </TableRow>
                        </>
                      ))
                    }
                  </>
                  ))
                }
              </TableBody>
                
            </Table>
            </>
            }

            <br /><br />

            
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} startIcon={<CancelIcon />} >
            Закрыть
          </Button>
          {/* <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Обновить
          </Button> */}
        </DialogActions>
    </BootstrapDialog>
  );
}
