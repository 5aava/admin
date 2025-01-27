import {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Snackbar from '../../../components/Snackbar';

import CreateContractDialog from './CreateContractDialog'
import DeleteContractDialog from './DeleteContractDialog'
import UpdateContractDialog from './UpdateContractDialog'

import {
  DataGrid,
  GridActionsCellItem,
  useGridApiRef
} from '@mui/x-data-grid';

import useFetch from "../../../modules/useFetch";


export default function Contracts() {
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

  const [response] = useFetch("/api/private/contracts/all", {});

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

  /*
- Номер договора (текстовое поле)                         +         
- Один Главный исполнитель                                +
- Один трек исполнителя                                   +
- Один лицензиар                                          +
- Дата релиза (календарь)                                 +

- Добавить исполнителя (+)                                
  - Исполнитель                                           
  - Выбор (певец, автор текста, автор музыки)             
  - процентная ставка                                     
  - Кнопка добавить, удалить                              

- Налог (0% или 6%)                                       +
- вручную вносим ISRC (текстовое поле)                    +
- вручную вносим UPC (текстовое поле)                     +
- вручную вносим "Ссылка на релиз" (текстовое поле)       +

-	подгружаем PDF файл                                     +
-	Сохраняем, отправляем на Модерацию                      

  */
  const columns = [
    { field: 'id', headerName: 'ID', width: 40, editable: false },
    { field: 'sku', headerName: 'Договор №', width: 120, editable: true },
    { field: 'contractor', headerName: 'Гл. исп-тель', width: 240, editable: true },
    { field: 'track', headerName: 'Трек', width: 120, editable: true },
    { field: 'licensor', headerName: 'Лицензиар', width: 120, editable: true },
    { field: 'date', headerName: 'Дата релиза', width: 120, editable: true },

    { field: 'authors', headerName: 'Авторы и певцы', width: 300, editable: true },

    { field: 'tax', headerName: 'Налог', width: 120, editable: true },
    { field: 'isrc', headerName: 'ISRC', width: 120, editable: true },
    { field: 'upc', headerName: 'UPC', width: 120, editable: true },
    { field: 'link', headerName: 'Ссылка на релиз', width: 120, editable: true },
    { field: 'file', headerName: 'PDF файл', width: 120, editable: true },
    { field: 'moderated', headerName: 'На модерации', width: 120, editable: true },
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
        Добавить договор
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
        <CreateContractDialog
          title={"Добавить договор"}
          text={"Для добавления необходимо заполнить все поля"}
          open={dialogOpen}
          close={handleDialogClose}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      )}

      { dialogUpdate && (
        <UpdateContractDialog
          title={"Обновить договор"}
          text={"Для обновления необходимо заполнить все поля"}
          open={dialogUpdate} 
          close={handleDialogClose}
          contract={dialogUpdateContract}
          handleSnackbarOpen={handleSnackbarOpen}
        />
      )}

      { dialogDelete && (
        <DeleteContractDialog
          open={dialogDelete} 
          contractId={dialogDeleteContract}
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
