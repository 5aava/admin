import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  ListItem,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  Home as HomeIcon,
  Shop as ShopIcon,
  People as PeopleIcon,
  MeetingRoom as MeetingRoomIcon,
  BusinessCenter as BusinessCenterIcon,
  Star as StarIcon,
  QuestionAnswer as QuestionAnswerIcon,
  School as SchoolIcon,
  Computer as ComputerIcon,
  Assignment as AssignmentIcon,
  PlaylistAddCheck as PlacIcon,
  Help as HelpIcon,
  ImportContacts as ImportContactsIcon,
  Storage as StorageIcon,
  Comment as CommentIcon,
  VpnKey as VpnKeyIcon,
  VerifiedUser as VerifiedUserIcon,
  ChromeReaderMode as ChromeReaderModeIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Payment as PaymentIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material/';


import { logoutUser } from '../../redux/actions';


function Menu () {

  return (
    <List>
      <main>
        <Link to='/'>
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItem>
        </Link>

        <Divider />

        <Link to='/'>
          <ListItem button>
            <ListItemIcon><ChromeReaderModeIcon /></ListItemIcon>
            <ListItemText primary="Контент" />
          </ListItem>
        </Link>

        <Link to='/'>
          <ListItem button>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Пользователи" />
          </ListItem>
        </Link>

        <Divider />


      </main>
    </List>
  );
}

Menu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(null, mapDispatchToProps)(Menu);
