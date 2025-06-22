import React from 'react'
import {Box, Button, DataTable, Paper, TableCell, TableContainer, TableHead, TableRow, Typography} from '@cw/rds'
import { useNavigate } from 'react-router-dom'
const ManageUsers = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography sx={{marginLeft:"5px"}} variant="subtitle1">Manage Users</Typography>
        <Button onClick={()=> navigate("/newuser")}>+ Add User</Button>
      </Box>
      <TableContainer component={Paper}>
        <DataTable>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
        </DataTable>
      </TableContainer>
    </>
  )
}

export default ManageUsers