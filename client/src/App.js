import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import List from './components/UserList';
import axios from 'axios';
import config from './config';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [showModal, setShowModal] = useState(false);

  const [UserList, setUserList] = useState([]);
 const [User,setUser]=useState({
  name:"",
  email:""
 });
 const [Type, setType] = useState('Add');

  useEffect(()=>{

    fetchUser();
  },[]);

  const fetchUser=async()=>{
    try {
      const response=await axios.get(`${config.baseUrl}/api/getUsers`);
      console.log(response,"response");
      if(response.status=='201')
      setUserList(response.data.response);
    } catch (error) {
     console.log(error,"error"); 
    }
  }
  



console.log(User,"user");
  return (
    <div className="m-auto">
      <div className="mx-10 border flex justify-center">
        <IconButton
          color="primary"
          variant="outlined"
          className="align-center border"
          onClick={() => { setType('Add');setShowModal(true)}}
        >
          <AddCircleOutlineOutlinedIcon />
          Add User
        </IconButton>
      </div>
        <Modal  user={User} setuser={setUser} fetchUser={fetchUser} setShowModal={setShowModal} showModal={showModal} type={Type} />
       <p className='text-center my-7 text-2xl text-sky-600'>User List</p>
    
      <List User={UserList} setUser={setUser} fetchUser={fetchUser} showModal={showModal} setType={setType} setShowModal={setShowModal} />

    </div>
  );
}

export default App;
