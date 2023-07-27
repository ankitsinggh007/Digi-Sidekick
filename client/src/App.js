import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import UserList from './components/UserList';
import axios from 'axios';

function App() {

  const [userList, setuserList] = useState([]);

  useEffect(()=>{

    fetchUser();
  },[]);

  const fetchUser=async()=>{
    const response=await fetch('Api');
    console.log(response,"response");

  }




  return (
    <div className="m-auto">
        <Modal/>
    <p className='text-center my-7 text-2xl text-sky-600'>User List</p>
      <UserList List={userList}/>
    </div>
  );
}

export default App;
