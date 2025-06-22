import React from 'react'
import {
  Box,
  Drawer,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar
} from '@cw/rds';
import { NavLink } from 'react-router-dom';
import { UserOctagon, HierarchySquare, CherryworkIcon } from '@cw/rds/icons';

import "./SideNavbar.css"

const sidebarWidth = 240;

const SideNavbar = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "50px", gap: 3, background: "#1e0c40", height: "90vh", margin: -1, marginTop: 1, padding: 2, paddingTop: 2 }}>
        <NavLink to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          {({ isActive }) => (
            <>
              <UserOctagon size='xxlarge' color={({ isActive }) => (isActive ? 'white' : "")} />
              <Typography variant="body1">Users</Typography>
            </>
          )}
        </NavLink>
        <NavLink to="/roles"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          {({ isActive }) => (
            <>
              <HierarchySquare size='xxlarge' color={({ isActive }) => (isActive ? 'white' : "")} />
              <Typography variant="body1">Roles</Typography>
            </>
          )}
        </NavLink>
      </Box>
    </>
  )
}

export default SideNavbar