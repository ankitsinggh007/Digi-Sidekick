import React from "react";
import { useState } from "react";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import { FormLabel,InputLabel,Input } from '@mui/material';


export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  
  const [NameError, setNameError] = useState(false);

  const [EmailError, setEmailError] = useState(false);
  const [User, setUser] = useState({
    name:"",
    email:""
  });

  const submitHandler=(e)=>{
    console.log(e.target.id)
    if(e.target.id==='name'){
      setNameError(false);
    }
    if(e.target.id==='email') setEmailError(false);
    
    setUser({...User,[e.target.id]:e.target.value});
  }

  const addUser=()=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const onlyLettersRegex = /^[A-Za-z ]+$/;
    const validName=onlyLettersRegex.test(User.name);

    const validEmail=emailRegex.test(User.email);
    
    if(!validEmail ){
        setEmailError(true);
    }
    if(!validName){
        setNameError(true);
    }
    if(validEmail && validName){
    // post data on server  
     
      setUser({
        name:"",email:""
    })
        setShowModal(false)
      
    }

  }

  
  return (
    <>
      <div className='mx-10 border flex justify-center'>
      <IconButton color='primary' variant='outlined' className='align-center border'  onClick={() => setShowModal(true)}>
      < AddCircleOutlineOutlinedIcon/>Add User
      </IconButton>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <FormLabel>
                  <InputLabel htmlFor="name">Name</InputLabel>
                     <Input  className={NameError?'bg-rose-100':''} id="name" onChange={submitHandler} error={NameError} placeholder={NameError?'*name is invalid':'Name'} />
                     <br/>

                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <Input  className={EmailError?'bg-rose-100':''} id="email" error={EmailError} onChange={submitHandler} placeholder={EmailError?'*email is invalid':'email'} />
                     <br/>

                  </FormLabel>
                </div>
                
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={addUser}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}