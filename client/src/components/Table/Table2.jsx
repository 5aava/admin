import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import Snackbar from '../Snackbar/Snackbar.jsx';
import { snackbarupdate } from '../../redux/actions';
import { notifier } from '../../controllers/utils';

import MaterialTable from 'material-table';


class MaterialTableDemo extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    const addRow = async (newData) => {
      await this.props.addRow(newData, 'add')
        .then(async res => {
          if (res.status == 'added') {
            this.props.snackbarupdate(notifier(true, 'add'));
            await this.props.fetchMyAPI();
          } else {
            this.props.snackbarupdate(notifier(false));
          }
        });
    };

    const updateRow = async (newData) => {
      await this.props.updateRow(newData, 'update')
        .then(async (res) => {
          if (res.status == 'updated') {
            this.props.snackbarupdate(notifier(true, 'update'));
            await this.props.fetchMyAPI();
          } else {
            this.props.snackbarupdate(notifier(false));
          }
        });
    };

    const deleteRow = async (oldData) => {
      await this.props.deleteRow(oldData, 'delete')
        .then(async (res) => {
          if (res.status == 'deleted') {
            this.props.snackbarupdate(notifier(true, 'delete'));
            await this.props.fetchMyAPI();
          } else {
            this.props.snackbarupdate(notifier(false));
          }
        });
    };


    const editable = {
      onRowAdd: this.props.addRow && (async (newData) => await addRow(newData)),
      onRowUpdate: this.props.updateRow && (async (newData, oldData) => await updateRow(newData, oldData)),
      onRowDelete: this.props.deleteRow && (async (oldData) => await deleteRow(oldData)),
    };

    return (

      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <MaterialTable
          title={this.props.title}
          columns={this.props.columns}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          data={this.props.data}
          onSearchChange={(e) => console.log('search changed: ' + e)}
          onFilterChange={(e) => console.log('filter changed: ' + e)}
          options={{
            sorting: true,
            filtering: true,
            exportButton: true,
            actionsColumnIndex: -1,
            pageSize: 25,
            pageSizeOptions: [10,25,50,100],
            addRowPosition: 'first',
            headerStyle: {
              backgroundColor: '#3f51b5',
              color: '#FFFFFF',
            },
          }}
          editable={editable}
          actions={
            this.props.uri ?
              [
                {
                  icon: 'article',
                  tooltip: 'Edit Note',
                  onClick: (event, rowData) =>
                    this.props.history.push(`/${this.props.uri}/${rowData.id}`),
                },
              ] :
              null
          }
        />
        <Snackbar />
      </div>
    );
  }

}

MaterialTableDemo.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  uri: PropTypes.string,
  columns: PropTypes.array.isRequired,
  addRow: PropTypes.func,
  updateRow: PropTypes.func,
  deleteRow: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  snackbarupdate: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  snackbarupdate,
};

export default connect(null, mapDispatchToProps)(withRouter(MaterialTableDemo));
