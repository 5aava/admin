import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox.js';
import MailIcon from '@mui/icons-material/Mail.js';
import Tooltip from '@mui/material/Tooltip';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu.js';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import {Switch, Route} from 'react-router-dom';
import Menu from '../../components/Menu/Menu.jsx';
import Logout from '../../components/Logout/Logout.jsx';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft.js';
import ChevronRightIcon from '@mui/icons-material/ChevronRight.js';

import PageMain from '../Pages/Main/Main.jsx';
import PageContents from '../Pages/Contents/Contents.jsx';

const drawerWidth = 240;

export default function ClippedDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            
          </Typography>
        </Toolbar>
      </AppBar> */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel Demo Version
          </Typography>

          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/7.jpg" style={{marginRight:'10px'}} />
            </IconButton>
          </Tooltip>           
          
          <Logout />

         
          
        </Toolbar>
      </AppBar>      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        
        <Toolbar />
          <Menu />        
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Меню 1', 'Меню 2', 'Меню 3', 'Меню 4'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          <Switch>
            <Route exact path="/" render = {() => <PageMain />} />
            <Route exact path="/contents" render = {() => <PageContents />} />
          </Switch>
      </Box>
    </Box>
  );
}
