import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //window pop ups
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };
    axios
      .post("http://localhost:5100/api/accounts/register", data)
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Registered succesfully!", { variant: "success" });

        setName("");
        setEmail("");
        setPassword("");
        navigate("/login-account");
      })
      .catch((err) => {
        console.error(err);

        // Check if error is due to the server response and display the message
        if (err.response) {
          enqueueSnackbar(err.response.data.message || "Registration failed!", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("An error occurred during registration.", {
            variant: "error",
          });
        }
      });
  };
  return (
    <div>
      <div className=" container d-flex align-items-center justify-content-center vh-100 ">
        <div className="row p-5 shadow">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                autoComplete="username"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                autoComplete="current-password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary flex-1 w-100">
              Register
            </button>
            <p className="text-secondary pt-1">Already have an Account?</p>
            <Link
              to={"/login-account"}
              type="submit"
              className="btn btn-success flex-1 w-100"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
