import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const rows = [
        {name:"ankit",email:"ankit@gmail.com"}
];

export default function UserList() {
  return (
    <TableContainer component={Paper}>
      <Table className='w-auto'  >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}