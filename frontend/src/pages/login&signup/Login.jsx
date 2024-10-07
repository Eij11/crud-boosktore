// https://www.youtube.com/watch?v=XOnmDZ9LNDM

import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //window pop ups
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    axios
      .post("http://localhost:5100/api/accounts/login", data)
      .then((res) => {
        console.log(res);
        if (res.data === "Success") {
          navigate("/home");
          enqueueSnackbar("Logged in succesfully!", { variant: "success" });
        }
        setEmail("");
        setPassword("");

        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`Error: ${err.response.data.message}`, {
          variant: "error",
        });
      });
  };

  return (
    <div>
      <div className=" container d-flex align-items-center justify-content-center vh-100 ">
        <div className="row p-5 shadow">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email} // Bind email to state
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" className="btn btn-success flex-1 w-100">
              Login
            </button>
            <Link to={"/register-account"}>Still don't have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
