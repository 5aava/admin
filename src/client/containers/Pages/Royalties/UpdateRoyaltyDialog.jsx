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

  const [royaltyData] = useFetch(`/api/private/royalties/${props?.royalty?.id}`, {});

  /* useEffect(() => {
    if(constr) {

      const newContractors = constr.map(item => {
        return {
          id: item.id,
          title: `${item.lastname} ${item.firstname} ${item.patronymic} (${item.nickname})`
        }
      });

      setContractors(newContractors);
    }
  }, [constr]) */

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


            =============================================================================================

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
