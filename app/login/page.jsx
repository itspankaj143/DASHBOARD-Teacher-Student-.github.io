"use client"
import React, { useState } from "react";
import Input from "../../components/input/input";
import { useRouter } from 'next/navigation';
// import { Link, useNavigate } from "react-router-dom";
import styles from "./page.module.css";
import axios from "axios";
import Link from "next/link";


const Login = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [data,setData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [submitdisabled, setSubmitDisabled] = useState(false);



//Handle Login Submission
  const handleSubmission = async() => {
    if (!values.username || !values.password) {
      setErrorMsg("Please Fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitDisabled(true);
  // fetch login details
    try{

    const response = await axios.get(`http://localhost:3000/api/teacherall/${values.username}`)
    
    const data = await response.data.teacher;  
    // console.log(data);
    setData(data)  
    setSubmitDisabled(false);
  }
  catch(err){
    setErrorMsg('Enter Valid UserName')
    setSubmitDisabled(false)
  }
// console.log(data);
  // check Credentials
  if(data.UserName){
    if(values.password==data.Password){
      if(data.Role==="teacher"){
        router.push('/teachercalender');
      }
      else{
        router.push('/studentcalender');
      }
    }
    else{
      setErrorMsg("Enter Valid Password");
    }
  }
    
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <Input
          label="Username"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, username: event.target.value }))
          }
          placeholder="Enter Username"
        />
        <Input
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitdisabled}>
            Login
          </button>
          <p>
          Doesn&apos;t have an account?
            <span>
              <Link href="/form"> Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
