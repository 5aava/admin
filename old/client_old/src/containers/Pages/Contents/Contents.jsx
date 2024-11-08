import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['uid','avatar', 'name', 'phone', 'username', 'email', 'age', 'rating', 'country', 'isAdmin', 'dateCreated'];

export default function BasicExampleDataGrid() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid {...data} components={{ Toolbar: GridToolbar }} />
    </div>
  );
}

