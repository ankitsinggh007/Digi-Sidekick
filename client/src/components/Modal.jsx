import React, { useEffect } from "react";
import { useState } from "react";

import { FormLabel, InputLabel, Input } from "@mui/material";
import axios from "axios";
import config from "../config";

const Modal=({user,fetchUser,showModal,setShowModal,type})=> {
  const [NameError, setNameError] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [User, setUser] = useState({
    name: "",
    email: "",
  });
  useEffect(()=>{
    console.log(type,"type");
    if(type==="Update") setUser({
        name:user.name,
        email:user.email,
      })
    
    else setUser({
        name:"",
        email:""
      })
    
  },[showModal]);
  const [Loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    if (e.target.id === "name") {
      setNameError(false);
    }
    if (e.target.id === "email") setEmailError(false);
    setUser({ ...User, [e.target.id]: e.target.value });
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        `${config.baseUrl}/api/createUsers`,
        User
      );
      alert(response?.data?.message);
      setShowModal(false);
      fetchUser();

    } catch (error) {
      alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const updateUser=async()=>{
    try {
      const response = await axios.put(
        `${config.baseUrl}/api/update/${user._id}`,
        User
      );
      alert(response?.data?.message);
      setShowModal(false);
      fetchUser();

    } catch (error) {
      alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const addUser = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const onlyLettersRegex = /^[A-Za-z ]+$/;
    const validName = onlyLettersRegex.test(User.name);
    const validEmail = emailRegex.test(User.email);

    if (!validEmail) {
      setEmailError(true);
    }
    if (!validName) {
      setNameError(true);
    }
    if (validEmail && validName) {
      setLoading(true);
      
      if(type=='Add'){
        postData();
      }
      else{
        updateUser();
      }

      setUser({
        name: "",
        email: "",
      });
    }
  };
  
  return (
    <>
      
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{type} User</h3>
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
                    <Input
                      className={NameError ? "bg-rose-100" : ""}
                      id="name"
                      value={User.name}
                      onChange={submitHandler}
                      error={NameError}
                      placeholder={NameError ? "*name is invalid" : "Name"}
                    />
                    <br />

                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input
                      className={EmailError ? "bg-rose-100" : ""}
                      id="email"
                      value={User.email}

                      error={EmailError}
                      onChange={submitHandler}
                      placeholder={EmailError ? "*email is invalid" : "email"}
                    />
                    <br />
                  </FormLabel>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setUser({name:"",email:""});setShowModal(false)}}
                  >
                    Close
                  </button>
                  {!Loading ? (
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={addUser}
                    >
                      
                      {type=='Add'?'ADD':'Update'}

                    </button>
                  ) : (
                    <button type="button" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" disabled>
                      <svg
                        class="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                      />
                      {type=='Add'?'Adding...':'Updating...'}
                    </button>
                  )}
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

export default Modal;