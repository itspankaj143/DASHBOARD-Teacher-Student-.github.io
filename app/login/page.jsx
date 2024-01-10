"use client";
// Import necessary dependencies
import React, { useState, useEffect } from "react";
import Input from "../../components/input/input";
import { useRouter } from "next/navigation"; // Importing navigation from Next.js
import styles from "./page.module.css";
import axios from "axios"; // Axios for handling HTTP requests
import Link from "next/link"; // For Next.js routing

const Login = () => {
  const router = useRouter(); // Get router instance
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(""); // State to manage error message
  const [submitdisabled, setSubmitDisabled] = useState(false); // State to manage form submission

  // Check if the user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const role = localStorage.getItem("userRole");
      if (role === "teacher") {
        router.push("/teachercalender"); // Redirect to teacher's calendar
      } else {
        router.push("/studentcalender"); // Redirect to student's calendar
      }
    }
  }, []);

  // Function to handle form submission
  const handleSubmission = async () => {
    if (!values.username || !values.password) {
      setErrorMsg("Please fill in all fields"); // Show error if fields are empty
      return;
    }
    setErrorMsg(""); // Clear previous error messages
    setSubmitDisabled(true); // Disable the submit button while processing the request

    try {
      const response = await axios.get(
        `http://localhost:3000/api/teacherall/${values.username}`
      );

      const data = await response.data.teacher;

      setSubmitDisabled(false); // Enable the submit button

      if (data && values.password === data.Password) {
        // If username and password match
        localStorage.setItem("isLoggedIn", "true"); // Set user as logged in
        localStorage.setItem("userRole", data.Role); // Set user's role
        if (data.Role === "teacher") {
          router.push("/teachercalender"); // Redirect to teacher's calendar
        } else {
          router.push("/studentcalender"); // Redirect to student's calendar
        }
      } else {
        setErrorMsg("Invalid username or password"); // Show error for invalid credentials
        setSubmitDisabled(false); // Enable the submit button
      }
    } catch (err) {
      setErrorMsg("Invalid username or password"); // Show error for invalid credentials
      setSubmitDisabled(false); // Enable the submit button
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className="text-center bg-gray-500 rounded-md text-white">
          Login To Dashboard
        </h1>

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
