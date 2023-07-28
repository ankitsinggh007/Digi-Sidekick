import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import config from '../config';





const UserList=({User,setUser,fetchUser,showModal,setShowModal,setType})=> {



  const updateUser=(candidate)=>{
    // const candidate =e.target.id;
    
    setType('Update');
    setUser(candidate);
    setShowModal(true);
    
  }
  
  const deleteUser=async(e)=>{
    const userId=e.target.id;
    try {
      const response = await axios.delete(`${config.baseUrl}/api/deletes/${userId}`);
      alert(response?.data?.message)
      fetchUser();
    } catch (error) {
      alert(error?.response?.data?.message);
    }

  }



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
          {User?.map((candidate) => (
            <TableRow
              key={candidate._id}
            >
              <TableCell>
                {candidate.name}
              </TableCell>
              <TableCell >{candidate.email}</TableCell>
              <TableCell >
                
                <button 
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow"
                id={candidate}
                onClick={()=>updateUser(candidate)}
                
                
                >Update</button>
                
                <button
                className="px-4 ml-2 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow"

                id={candidate._id}
                onClick={deleteUser}
                >Delete</button>
                
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default UserList;