import {useState, useEffect} from 'react';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Snackbar from '../../../components/Snackbar';

/* import CreateContractDialog from '../Contracts/CreateContractDialog';
import DeleteContractDialog from '../Contracts/DeleteContractDialog'; */
import UpdateContractDialog from '../Contracts/UpdateContractDialog';

import {
  DataGrid,
  GridActionsCellItem,
  useGridApiRef
} from '@mui/x-data-grid';

import useFetch from "../../../modules/useFetch";


export default function Moderated(props) {
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const [dialogOpen, dialogOpenSet] = useState(false);

  const [dialogUpdate, dialogUpdateSet] = useState(false);
  const [dialogUpdateContract, dialogUpdateContractSet] = useState(null);

  const [dialogDelete, dialogDeleteSet] = useState(false);
  const [dialogDeleteContract, dialogDeleteContractSet] = useState(null);

  const [snackbarText, snackbarTextSet] = useState('Ошибка: Договор не добавлен');
  const [snackbarType, snackbarTypeSet] = useState('error');
  const [snackbarOpen, snackbarOpenSet] = useState(false);

  const [response] = useFetch("/api/private/contracts/all?isModerated=1", {});

  useEffect(() => {
    if(response) {
      setRows(response);
    }
  }, [response])

  const handleUpdateClick = (id) => () => {
    const contract = rows.filter((row) => row.id === id)[0];

    dialogUpdateSet(true);
    dialogUpdateContractSet(contract);
  };

  const handleDeleteClick = (id) => () => {
    dialogDeleteSet(true);
    dialogDeleteContractSet(id);
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
            sku: data.sku,
            contractorId: data.contractorId,
            licensorId: data.licensorId,
            trackId: data.trackId,
            contractor: data.contractor, 
            track: data.track, 
            licensor: data.licensor, 
            authors: data.authors, 
            date: data.date, 
            tax: data.tax, 
            isrc: data.isrc, 
            upc: data.upc, 
            link: data.link, 
            file: data.file, 
            moderated: data.moderated, 
          }
        ]);
      break;
      case 'update': 
        apiRef.current.updateRows([
          { 
            id: data.id, 
            sku: data.sku, 
            contractorId: data.contractorId,
            licensorId: data.licensorId,
            trackId: data.trackId,
            contractor: data.contractor,
            track: data.track,
            licensor: data.licensor,
            authors: data.authors, 
            date: data.date, 
            tax: data.tax, 
            isrc: data.isrc, 
            upc: data.upc, 
            link: data.link, 
            file: data.file, 
            moderated: data.moderated, 
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
    { field: 'sku', headerName: 'Договор №', width: 120 },
    { field: 'contractor', headerName: 'Гл. исп-тель', width: 240 },
    { field: 'track', headerName: 'Трек', width: 120 },
    { field: 'licensor', headerName: 'Лицензиар', width: 120 },
    
    { field: 'date', headerName: 'Дата релиза', width: 120,
      renderCell: (params) => <>{dayjs(params.row.date).format('DD.MM.YYYY')}</>,
    },

    { field: 'authors', headerName: 'Авторы и певцы', width: 300 },

    { field: 'tax', headerName: 'Налог', width: 120,
      renderCell: (params) => <>{params.row.tax}%</>,
    },
    { field: 'isrc', headerName: 'ISRC', width: 120 },
    { field: 'upc', headerName: 'UPC', width: 120 },
    { field: 'link', headerName: 'Ссылка на релиз', width: 120,
      renderCell: (params) => 
        <a href={params.row.link} target='_blank'>{params.row.link}</a>,    
    },
    /* { field: 'file', headerName: 'PDF файл', width: 120 }, */
    { field: 'moderated', headerName: 'На модерации', width: 120,
      renderCell: (params) => <>{params.row.moderated == 1 ? 'На модерации' : 'Нет'}</>,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Редактировать"
            className="textPrimary"
            onClick={handleUpdateClick(id)}
            color="inherit"
          />,
          {/* <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />, */}
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
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleCreateClick}>
        Добавить запись
      </Button> */}
      <DataGrid
        apiRef={apiRef} 
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        rowsLoadingMode="server"
      />

      {/* { dialogOpen && (
        <CreateContractDialog
          title={"Добавить договор"}
          text={"Для добавления необходимо заполнить все поля"}
          open={dialogOpen}
          close={handleDialogClose}
          handleSnackbarOpen={handleSnackbarOpen}
          setNewRows={setRows}
        />
      )} */}

      { dialogUpdate && (
        <UpdateContractDialog
          title={"Редактировать договор"}
          text={"Для сохранения необходимо заполнить номер договора"}
          open={dialogUpdate} 
          close={handleDialogClose}
          contract={dialogUpdateContract}
          handleSnackbarOpen={handleSnackbarOpen}
          setNewRows={setRows}
          setCount={props.setCount}
        />
      )}

      {/* { dialogDelete && (
        <DeleteContractDialog
          open={dialogDelete} 
          contractId={dialogDeleteContract}
          close={handleDialogClose}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      )} */}

      <Snackbar 
        open={snackbarOpen} 
        type={snackbarType}
        text={snackbarText}
        close={handleSnackbarClose} 
      />
    </Box>
  );
}
