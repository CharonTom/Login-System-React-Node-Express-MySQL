import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../../context/authContext";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [toggle, setToggle] = useState(false);
  const [formValues, setFormvalues] = useState(initialValues);

  const showPassword = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const { successfullyLogin, login, formError, setFormError } =
    useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
    setFormError("");
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await login(formValues);
      setFormError("");
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (successfullyLogin) navigate("/");
  }, [successfullyLogin, navigate]);

  return (
    <div className="main">
      <form className="main__form" onSubmit={handleForm}>
        <h1>Login</h1>

        <div className="main__form__input">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formValues.email}
          />
        </div>

        <div className="main__form__input">
          <div className="main__form__input__eye" onClick={showPassword}>
            {toggle ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
          <input
            type={toggle ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formValues.password}
          />
        </div>
        {formError && <p className="main__form__error">{formError}</p>}
        <button className="button" type="submit">
          Login
        </button>
        <div className="main__form__nav">
          Not registered yet ? <Link to={"/signup"}>Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
