import {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

import Snackbar from '../../../components/Snackbar';
import CreateReportDialog from './CreateReportDialog';
import DeleteReportDialog from './DeleteReportDialog';

import {
  DataGrid,
  GridActionsCellItem,
  useGridApiRef
} from '@mui/x-data-grid';

import useFetch from "../../../modules/useFetch";


export default function Reports() {
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const [dialogOpen, dialogOpenSet] = useState(false);

  const [dialogUpdate, dialogUpdateSet] = useState(false);
  const [dialogUpdateReport, dialogUpdateReportSet] = useState(null);

  const [dialogDelete, dialogDeleteSet] = useState(false);
  const [dialogDeleteReport, dialogDeleteReportSet] = useState(null);

  const [snackbarText, snackbarTextSet] = useState('Ошибка: Лицензиар не добавлен');
  const [snackbarType, snackbarTypeSet] = useState('error');
  const [snackbarOpen, snackbarOpenSet] = useState(false);

  const [response] = useFetch("/api/private/reports", {});

  useEffect(() => {
    if(response) {
      setRows(response);
    }
  }, [response])

  const handleDeleteClick = (id) => () => {
    dialogDeleteSet(true);
    dialogDeleteReportSet(id);
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
            royaltyId: data.royaltyId,
            totalIncomes: data.totalIncomes,
            totalPayments: data.totalPayments,
            totalSaldo: data.totalSaldo,
          }
        ]);
      break;
      case 'update': 
        apiRef.current.updateRows([
          { 
            id: data.id, 
            royaltyId: data.royaltyId,
            totalIncomes: data.totalIncomes,
            totalPayments: data.totalPayments,
            totalSaldo: data.totalSaldo,
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
    { field: 'contractor', headerName: 'Исполнитель', width: 260 },
    { field: 'date', headerName: 'Дата рачета', width: 160 },
    { field: 'royaltyId', headerName: 'ID Роялти', width: 100 },
    { field: 'totalIncomes', headerName: 'Доходы', width: 150 },
    { field: 'totalPayments', headerName: 'Выплаты', width: 150 },
    { field: 'totalSaldo', headerName: 'Сальдо', width: 150 },
     {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <IconButton component={Link} href={`pdfs/${id}.pdf`} target='_blank'>
            <OpenInNewIcon />
          </IconButton>,
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
        Создать отчет
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
        <CreateReportDialog
          title={"Создать отчет"}
          text={"Для добавления необходимо заполнить все поля"}
          open={dialogOpen}
          close={handleDialogClose}
          handleSnackbarOpen={handleSnackbarOpen}
          setNewRows={setRows}
        />
      )}

      {/* { dialogUpdate && (
        <UpdateReportDialog
          title={"Обновить трек"}
          text={"Для обновления необходимо заполнить все поля"}
          open={dialogUpdate} 
          close={handleDialogClose}
          track={dialogUpdateReport}
          handleSnackbarOpen={handleSnackbarOpen}
          setNewRows={setRows}
        />
      )} */}

      { dialogDelete && (
        <DeleteReportDialog
          open={dialogDelete} 
          reportId={dialogDeleteReport}
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
