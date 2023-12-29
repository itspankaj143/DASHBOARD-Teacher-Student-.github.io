"use client"
import React, { useEffect, useState } from "react";
import Input from "../../components/input/input";
import { useRouter } from 'next/navigation';
import axios from "axios";
import styles from "./page.module.css";


const Form = ({req,updateUser,btn,link,flag,add,update}) => {
    const router = useRouter();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    role:"",
  });
  
  // get initial values for update
  useEffect(() => {
    if(updateUser){
      setValues(updateUser[0])
    }
  },[updateUser])
  console.log(values);
  
  const [errorMsg,setErrorMsg] = useState("");
//   const [submitdisabled,setSubmitDisabled] = useState(false);

//  post request 
const sendPostRequest = async() =>{
  await axios.post("http://localhost:3000/api/teacherall",{
    FirstName: String(values.firstname),
    LastName: String(values.lastname),
    UserName: String(values.username),
    Password: String(values.password),
    Role: String(values.role),
  }) 
}

// update request
// const sendUpdateRequest = async() =>{
//   await axios.patch(`http://localhost:3000/api/users/${values._id}`,{
//     firstname: String(values.firstname),
//     lastname: String(values.lastname),
//     username: String(values.username),
//     password: String(values.password),
//     role: String(values.role),
//   })
// }


// handle form submission
  const handleSubmission=()=>{
    if(!values.firstname || !values.lastname || !values.username || !values.password || !values.role){
      setErrorMsg("Please Fill all fields");
      return;
    }
    setErrorMsg("");
    // setSubmitDisabled(true);

    // send req depending on param
    sendPostRequest().then(()=>{
     router.push("/login")
    //   setSubmitDisabled(false);
    //   if(flag){
    //     flag()
    //   }
    //   if(add){
    //     add(false);
    //   }
    //   if(update){
    //     update(false);
    //   }
    })
    .catch(err=>{
    //   setSubmitDisabled(false)
      setErrorMsg(err.message)
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1>Registeration Form</h1>
        <Input
          label="First Name"
          placeholder="Enter First Name"
          value={values?.firstname}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, firstname: event.target.value}))
          }
        />
        <Input
          label="Last Name"
          placeholder="Enter Last Name"
          value={values?.lastname}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, lastname: event.target.value}))
          }
        />
        <Input
          label="Username"
          placeholder="Enter Username"
          value={values?.username}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, username: event.target.value}))
          }
        />
        <Input
          label="Password"
          placeholder="Enter password"
          value={values?.password}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value}))
          }
        />
        <div className={styles.inputcontainer}>
          <label htmlFor="Role">Role</label>
          <div className={styles.checkbox}>
          <div>
            <input type="radio" name="Role" id="teacher" onClick={(event)=>setValues((prev)=>({...prev,role:"teacher"}))}/>
            <label htmlFor="teacher">Teacher</label>
          </div>
          <div>
            <input type="radio" name="Role" id="student" onClick={(event)=>setValues((prev)=>({...prev,role:"student"}))}/>
            <label htmlFor="student">Student</label>
          </div>
          </div>
        </div>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} >Register</button>
        </div>
      </div>
    </div>
  )
}

export default Form