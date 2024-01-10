"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

const Form = ({ updateUser }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    role: "",
  });

  // Fetch initial values for update if updateUser prop is provided
  useEffect(() => {
    if (updateUser) {
      setValues(updateUser[0]); // Set initial values for update
    }
  }, [updateUser]); // Trigger effect when updateUser prop changes
  // console.log(values); // Log the current form values

  const [errorMsg, setErrorMsg] = useState("");

  // Perform a POST request to the server
  const sendPostRequest = async () => {
    await axios.post("http://localhost:3000/api/teacherall", {
      FirstName: String(values.firstname),
      LastName: String(values.lastname),
      UserName: String(values.username),
      Password: String(values.password),
      Role: String(values.role),
    }); // Execute axios post request to save form data
  };

  // handle form submission
  const handleSubmission = () => {
    if (
      !values.firstname ||
      !values.lastname ||
      !values.username ||
      !values.password ||
      !values.role
    ) {
      setErrorMsg("Please Fill all fields");
      return;
    }
    setErrorMsg("");

    sendPostRequest()
      .then(() => {
        router.push("/login"); // Redirect to login page after successful form submission
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };
  return (
    // registeration form where teacher and students can register there details for getting to the dashboard
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className="text-center font-bold bg-gray-500  text-xl rounded-md text-white">
          Registeration Form
        </h1>
        <Input
          label="First Name"
          placeholder="Enter First Name"
          value={values?.firstname}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, firstname: event.target.value }))
          }
        />
        <Input
          label="Last Name"
          placeholder="Enter Last Name"
          value={values?.lastname}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, lastname: event.target.value }))
          }
        />
        <Input
          label="Username"
          placeholder="Enter Username"
          value={values?.username}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, username: event.target.value }))
          }
        />
        <Input
          label="Password"
          placeholder="Enter password"
          value={values?.password}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
        />
        {/* // get the toggle radio button for specific one for Register */}
        <div className={styles.inputcontainer}>
          <label htmlFor="Role">Role</label>
          <div className={styles.checkbox}>
            <div>
              <input
                type="radio"
                name="Role"
                id="teacher"
                onClick={(event) =>
                  setValues((prev) => ({ ...prev, role: "teacher" }))
                }
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
            <div>
              <input
                type="radio"
                name="Role"
                id="student"
                onClick={(event) =>
                  setValues((prev) => ({ ...prev, role: "student" }))
                }
              />
              <label htmlFor="student">Student</label>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
