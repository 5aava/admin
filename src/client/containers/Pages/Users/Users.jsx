import {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Snackbar from '../../../components/Snackbar';

import CreateUserDialog from './CreateUserDialog'
import DeleteUserDialog from './DeleteUserDialog'
import UpdateUserDialog from './UpdateUserDialog'

import {
  DataGrid,
  GridActionsCellItem,
  useGridApiRef
} from '@mui/x-data-grid';

import useFetch from "../../../modules/useFetch";


export default function Users() {
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const [dialogOpen, dialogOpenSet] = useState(false);

  const [dialogUpdate, dialogUpdateSet] = useState(false);
  const [dialogUpdateUser, dialogUpdateUserSet] = useState(null);

  const [dialogDelete, dialogDeleteSet] = useState(false);
  const [dialogDeleteUser, dialogDeleteUserSet] = useState(null);

  const [snackbarText, snackbarTextSet] = useState('Ошибка: Пользователь не добавлен');
  const [snackbarType, snackbarTypeSet] = useState('error');
  const [snackbarOpen, snackbarOpenSet] = useState(false);

  const [response] = useFetch("/api/private/users/all", {});

  useEffect(() => {
    if(response) {
      setRows(response);
    }
  }, [response])

  const handleUpdateClick = (id) => () => {
    const user = rows.filter((row) => row.id === id)[0];

    dialogUpdateSet(true);
    dialogUpdateUserSet(user);
  };

  const handleDeleteClick = (id) => () => {
    dialogDeleteSet(true);
    dialogDeleteUserSet(id);
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
          { id: data.id, name: data.name, email: data.email , role: data.role }
        ]);
      break;
      case 'update': 
        apiRef.current.updateRows([
          { id: data.id, name: data.name, email: data.email , role: data.role }
        ]);
      break;
      case 'delete': 
        apiRef.current.updateRows([{ id: data.id, _action: 'delete' }]);
      break;
    }
    
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 60, editable: false },
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'email', headerName: 'Email', width: 240, editable: true },
    { field: 'role', headerName: 'Role', width: 180, editable: true },
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

      {dialogOpen && (
        <CreateUserDialog
          title={"Добавить пользователя"}
          text={"Для добавления необходимо заполнить все поля"}
          open={dialogOpen} 
          close={handleDialogClose}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      )}

      { dialogUpdate && (
        <UpdateUserDialog
          title={"Обновить пользователя"}
          text={"Для обновления необходимо заполнить все поля"}
          open={dialogUpdate} 
          close={handleDialogClose}
          user={dialogUpdateUser}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      )}

      { dialogDelete && (
        <DeleteUserDialog
          open={dialogDelete} 
          userId={dialogDeleteUser}
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
