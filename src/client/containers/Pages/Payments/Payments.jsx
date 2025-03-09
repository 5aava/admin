import {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Snackbar from '../../../components/Snackbar';

import CreatePaymentDialog from './CreatePaymentsDialog'
import DeletePaymentDialog from './DeletePaymentsDialog'
import UpdatePaymentDialog from './UpdatePaymentsDialog'

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';

import {
  DataGrid,
  GridActionsCellItem,
  useGridApiRef
} from '@mui/x-data-grid';

import useFetch from "../../../modules/useFetch";


export default function Payments() {
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const [dialogOpen, dialogOpenSet] = useState(false);

  const [dialogUpdate, dialogUpdateSet] = useState(false);
  const [dialogUpdatePayment, dialogUpdatePaymentset] = useState(null);

  const [dialogDelete, dialogDeleteSet] = useState(false);
  const [dialogDeletePayment, dialogDeletePaymentset] = useState(null);

  const [snackbarText, snackbarTextSet] = useState('Ошибка: Выплата не добавлена');
  const [snackbarType, snackbarTypeSet] = useState('error');
  const [snackbarOpen, snackbarOpenSet] = useState(false);

  const [response] = useFetch("/api/private/payments/all", {});

  useEffect(() => {
    if(response) {
      setRows(response);
    }
  }, [response])

  const handleUpdateClick = (id) => () => {
    const payment = rows.filter((row) => row.id === id)[0];

    dialogUpdateSet(true);
    dialogUpdatePaymentset(payment);
  };

  const handleDeleteClick = (id) => () => {
    dialogDeleteSet(true);
    dialogDeletePaymentset(id);
  };

  const handleDialogClose = () => {
    dialogOpenSet(false);
    dialogDeleteSet(false);
    dialogUpdateSet(false);
  };

  const handleCreateClick = () => {
    dialogOpenSet(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    snackbarOpenSet(false);
  };

  const handleSnackbarOpen = (data, type, text, route) => {
    snackbarTextSet(text);
    snackbarTypeSet(type);
    snackbarOpenSet(true);

    switch(route){
      case 'add': 
        apiRef.current.updateRows([
          { 
            id: data.id, 
            contractorId: data.contractorId,
            contractor: data.contractor,
            trackId: data.trackId, 
            track: data.track,
            year: data.year, 
            q1: data.q1,
            q1p: data.q1p, 
            q2: data.q2,
            q2p: data.q2p, 
            q3: data.q3,
            q3p: data.q3p,
            q4: data.q4,
            q4p: data.q4p,
            total: data.total, 
            comment: data.comment,
          }
        ]);
      break;
      case 'update': 
        apiRef.current.updateRows([
          { 
            id: data.id, 
            contractorId: data.contractorId,
            contractor: data.contractor,
            trackId: data.trackId, 
            track: data.track,
            year: data.year, 
            q1: data.q1,
            q1p: data.q1p, 
            q2: data.q2,
            q2p: data.q2p, 
            q3: data.q3,
            q3p: data.q3p,
            q4: data.q4,
            q4p: data.q4p,
            total: data.total, 
            comment: data.comment,
          }
        ]);
      break;
      case 'delete': 
        apiRef.current.updateRows([{ id: data.id, _action: 'delete' }]);
      break;
    }
    
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 40, editable: false },
    { field: 'contractor', headerName: 'Гл. исп-тель', width: 240 },
    { field: 'track', headerName: 'Трек', width: 120 },

    { field: 'year', headerName: 'Год', width: 120 },
    { field: 'q1', headerName: 'Квартал I', width: 120 },
    { field: 'q1p', headerName: 'Оплачен', width: 80,
      renderCell: (params) => <>{params.row.q1p == 1 ? 
        <CheckBoxIcon sx={{marginTop:1}} fontSize={'large'} color="success" /> : 
        <CloseIcon fontSize={'large'} />}</>,
     },
    { field: 'q2', headerName: 'Квартал II', width: 120 },
    { field: 'q2p', headerName: 'Оплачен', width: 80, 
      renderCell: (params) => <>{params.row.q2p == 1 ? 
        <CheckBoxIcon sx={{marginTop:1}} fontSize={'large'} color="success" /> : ''}</>,
    },
    { field: 'q3', headerName: 'Квартал III', width: 120 },
    { field: 'q3p', headerName: 'Оплачен', width: 80,
      renderCell: (params) => <>{params.row.q3p == 1 ? 
        <CheckBoxIcon sx={{marginTop:1}} fontSize={'large'} color="success" /> : 
        <CloseIcon sx={{marginTop:1}} fontSize={'large'} color="error" />}</>,
    },
    { field: 'q4', headerName: 'Квартал IV', width: 120 },
    { field: 'q4p', headerName: 'Оплачен', width: 80,
      renderCell: (params) => <>{params.row.q4p == 1 ? 
        <CheckBoxIcon sx={{marginTop:1}} fontSize={'large'} color="success" /> : ''}</>,
    },
    { field: 'total', headerName: 'Итого за год', width: 120 },
    { field: 'comment', headerName: 'Коммент', width: 120 },
     {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleUpdateClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }, 
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <Button color="primary" startIcon={<AddIcon />} onClick={handleCreateClick}>
        Добавить запись
      </Button>
      <DataGrid
        apiRef={apiRef} 
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        rowsLoadingMode="server"
      />
      
      { dialogOpen && (
        <CreatePaymentDialog
          title={"Добавить выплату"}
          text={"Для добавления необходимо заполнить все поля"}
          open={dialogOpen}
          close={handleDialogClose}
          handleSnackbarOpen={handleSnackbarOpen}
          setNewRows={setRows}
        />
      )}

      { dialogUpdate && (
        <UpdatePaymentDialog
          title={"Обновить выплату"}
          text={"Для обновления необходимо заполнить все поля"}
          open={dialogUpdate} 
          close={handleDialogClose}
          payment={dialogUpdatePayment}
          handleSnackbarOpen={handleSnackbarOpen}
          setNewRows={setRows}
        />
      )}

      { dialogDelete && (
        <DeletePaymentDialog
          open={dialogDelete} 
          paymentId={dialogDeletePayment}
          close={handleDialogClose}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      )}

      <Snackbar 
        open={snackbarOpen} 
        type={snackbarType}
        text={snackbarText}
        close={handleSnackbarClose} 
      />
    </Box>
  );
}
