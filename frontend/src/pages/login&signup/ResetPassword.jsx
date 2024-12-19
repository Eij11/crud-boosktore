// https://www.youtube.com/watch?v=XOnmDZ9LNDM

import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const { id, token } = useParams();

  //window pop ups
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    const data = {
      password,
      //   password,
    };
    axios
      .post(
        `http://localhost:5100/api/accounts/reset-password/${id}/${token}`,
        data
      )
      .then((res) => {
        console.log(res);
        console.log("Backend Response:", res.data);

        // localStorage.setItem("token", res.data.token); // Store the JWT token
        // localStorage.setItem("role", res.data.role); // Store the role (admin/user)

        if (res.data.message === "Password successfully updated!") {
          navigate("/login-account");
        }

        // navigate("/login-account");
      })
      .catch((err) => {
        console.error(err);

        // Safely handle cases where `err.response` or `err.response.data` is undefined
        const errorMessage =
          err.response?.data?.message || "An unexpected error occurred";

        enqueueSnackbar(`Error: ${errorMessage}`, { variant: "error" });
      });
  };

  return (
    <div>
      <div
        className=" container d-flex align-items-center justify-content-center vh-100 "
        style={{ width: "30%" }}
      >
        <div className="row p-5 shadow">
          <h1>Reset Password</h1>
          <form onSubmit={handleResetPassword}>
            <div>
              <label className="form-label">Input your new password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password} // Bind email to state
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {/* <div className="mb-3">
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
            </div> */}
            <button type="submit" className="btn btn-success flex-1 w-100 my-3">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
