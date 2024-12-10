import {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Snackbar from '../../../components/Snackbar';

import CreateContractorDialog from './CreateContractorDialog'
import DeleteContractorDialog from './DeleteContractorDialog'
import UpdateContractorDialog from './UpdateContractorDialog'

import {
  DataGrid,
  GridActionsCellItem,
  useGridApiRef
} from '@mui/x-data-grid';

import useFetch from "../../../modules/useFetch";


export default function Сontractors() {
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const [dialogOpen, dialogOpenSet] = useState(false);

  const [dialogUpdate, dialogUpdateSet] = useState(false);
  const [dialogUpdateContractor, dialogUpdateContractorSet] = useState(null);

  const [dialogDelete, dialogDeleteSet] = useState(false);
  const [dialogDeleteContractor, dialogDeleteContractorSet] = useState(null);

  const [snackbarText, snackbarTextSet] = useState('Ошибка: Исполнитель не добавлен');
  const [snackbarType, snackbarTypeSet] = useState('error');
  const [snackbarOpen, snackbarOpenSet] = useState(false);

  const [response] = useFetch("/api/private/contractors/all", {});

  useEffect(() => {
    if(response) {
      setRows(response);
    }
  }, [response])

  const handleUpdateClick = (id) => () => {
    const contractor = rows.filter((row) => row.id === id)[0];

    dialogUpdateSet(true);
    dialogUpdateContractorSet(contractor);
  };

  const handleDeleteClick = (id) => () => {
    dialogDeleteSet(true);
    dialogDeleteContractorSet(id);
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
            nickname: data.nickname, 
            firstname: data.firstname, 
            lastname: data.lastname,
            patronymic: data.patronymic 
          }
        ]);
      break;
      case 'update': 
        apiRef.current.updateRows([
          { 
            id: data.id, 
            nickname: data.nickname, 
            firstname: data.firstname, 
            lastname: data.lastname,
            patronymic: data.patronymic 
          }
        ]);
      break;
      case 'delete': 
        apiRef.current.updateRows([{ id: data.id, _action: 'delete' }]);
      break;
    }
    
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 60, editable: false },
    { field: 'nickname', headerName: 'Псевдоним', width: 180, editable: true },
    { field: 'firstname', headerName: 'Имя', width: 180, editable: true },
    { field: 'lastname', headerName: 'Фамилия', width: 180, editable: true },
    { field: 'patronymic', headerName: 'Отчество', width: 180, editable: true },
     {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
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

      <CreateContractorDialog
        title={"Добавить исполнителя"}
        text={"Для добавления необходимо заполнить все поля"}
        open={dialogOpen} 
        close={handleDialogClose}
        handleSnackbarOpen={handleSnackbarOpen}
      />

      <UpdateContractorDialog
        title={"Обновить исполнителя"}
        text={"Для обновления необходимо заполнить все поля"}
        open={dialogUpdate} 
        close={handleDialogClose}
        contractor={dialogUpdateContractor}
        handleSnackbarOpen={handleSnackbarOpen}
      />

      <DeleteContractorDialog
        open={dialogDelete} 
        contractorId={dialogDeleteContractor}
        close={handleDialogClose}
        handleSnackbarOpen={handleSnackbarOpen}
      />

      <Snackbar 
        open={snackbarOpen} 
        type={snackbarType}
        text={snackbarText}
        close={handleSnackbarClose} 
      />
    </Box>
  );
}
