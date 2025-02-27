import {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Snackbar from '../../../components/Snackbar';

import CreateRoyaltyDialog from './CreateRoyaltyDialog'
import DeleteRoyaltyDialog from './DeleteRoyaltyDialog'
import UpdateRoyaltyDialog from './UpdateRoyaltyDialog'

import {
  DataGrid,
  GridActionsCellItem,
  useGridApiRef
} from '@mui/x-data-grid';

import useFetch from "../../../modules/useFetch";


export default function Royalties() {
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const [dialogOpen, dialogOpenSet] = useState(false);

  const [dialogUpdate, dialogUpdateSet] = useState(false);
  const [dialogUpdateRoyalty, dialogUpdateRoyaltySet] = useState(null);

  const [dialogDelete, dialogDeleteSet] = useState(false);
  const [dialogDeleteRoyalty, dialogDeleteRoyaltySet] = useState(null);

  const [snackbarText, snackbarTextSet] = useState('Ошибка: Лицензиар не добавлен');
  const [snackbarType, snackbarTypeSet] = useState('error');
  const [snackbarOpen, snackbarOpenSet] = useState(false);

  const [response] = useFetch("/api/private/royalties/all", {});

  useEffect(() => {
    if(response) {
      setRows(response);
    }
  }, [response])

  const handleUpdateClick = (id) => () => {
    const royalty = rows.filter((row) => row.id === id)[0];

    dialogUpdateSet(true);
    dialogUpdateRoyaltySet(royalty);
  };

  const handleDeleteClick = (id) => () => {
    dialogDeleteSet(true);
    dialogDeleteRoyaltySet(id);
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
            contractor: data.contractor,
            track: data.track,
            contract: data.contract,
            usnTax: data.usnTax,
            totalValByYears: data.totalValByYears,
            valMinusUsn: data.valMinusUsn,
            valForGaz: data.valForGaz,
            valForContractors: data.valForContractors,
          }
        ]);
      break;
      case 'update': 
        apiRef.current.updateRows([
          { 
            id: data.id, 
            contractor: data.contractor,
            track: data.track,
            contract: data.contract,
            usnTax: data.usnTax,
            totalValByYears: data.totalValByYears,
            valMinusUsn: data.valMinusUsn,
            valForGaz: data.valForGaz,
            valForContractors: data.valForContractors,
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
    { field: 'contractor', headerName: 'Гл. исполнитель', width: 220 },
    { field: 'track', headerName: 'Трек', width: 120 },
    { field: 'contract', headerName: 'Договор №', width: 120 },
    { field: 'usnTax', headerName: 'Налог', width: 60,
      renderCell: (params) => <>{params.row.usnTax}%</>,
    },
    { field: 'totalValByYears', headerName: 'ВАЛ', width: 120 },
    { field: 'valMinusUsn', headerName: 'ВАЛ -УСН', width: 120 },
    { field: 'valForGaz', headerName: 'ВАЛ ГАЗ', width: 120 },
    { field: 'valForContractors', headerName: 'ВАЛ для исполнителей', width: 120 },
     {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
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
        Сделать Расчет
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
        <CreateRoyaltyDialog
          title={"Добавить трек"}
          text={"Для добавления необходимо заполнить все поля"}
          open={dialogOpen}
          close={handleDialogClose}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      )}

      {/* { dialogUpdate && (
        <UpdateRoyaltyDialog
          title={"Обновить трек"}
          text={"Для обновления необходимо заполнить все поля"}
          open={dialogUpdate} 
          close={handleDialogClose}
          Royalty={dialogUpdateRoyalty}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      )} */}

      { dialogDelete && (
        <DeleteRoyaltyDialog
          open={dialogDelete} 
          royaltyId={dialogDeleteRoyalty}
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
