import React from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import axios from "axios";
import tick from "../../assets/tick.png";

function Signup() {
  const tmp_date = new Date().toISOString().split("T");
  const dateOfCreation = `${tmp_date[0]} ${tmp_date[1]}`;

  const initialValues = {
    username: "",
    email: "",
    password: "",
    date: "",
  };

  const [toggle, setToggle] = useState(false);
  const [formValues, setFormvalues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer la visibilité de la modale

  const showPassword = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
    setFormError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const verifyinput = (formValues) => {
    const errorFields = {};

    const regexUsername = /^[^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>,;:[\]]{1,20}$/;
    if (!formValues.username) errorFields.username = "Username is required";
    else if (!regexUsername.test(formValues.username))
      errorFields.username =
        "The name must be between 1 and 20 characters. No special characters or numbers. Dashes and accents are accepted";

    const regexEmail = /^[a-z0-9._-éèàùâôûîê]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!formValues.email) errorFields.email = "Email is required";
    else if (!regexEmail.test(formValues.email))
      errorFields.email =
        "The email must be between 2 and 45 characters. No special characters. Dashes and accents are accepted";

    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,25}$/;
    if (!formValues.password) errorFields.password = "password is required";
    else if (!regexPassword.test(formValues.password))
      errorFields.password =
        "The password must have minimum 5 and maximum 25 characters, at least one uppercase letter, one lowercase letter, one number and one special character";

    return errorFields;
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const errors = verifyinput(formValues);
    const data = { ...formValues, date: dateOfCreation };

    if (Object.keys(errors).length === 0) {
      setFormError({});
      try {
        await axios.post("http://localhost:5000/api/signup", data);
        setIsSubmit(true);
        setFormvalues(initialValues);
        setIsModalOpen(true);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 409) {
          setFormError(error.response.data);
        } else {
          console.log("Error submitting form:", error.message);
        }
      }
    } else {
      setFormError(errors);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmit(false);
  };

  return (
    <div className="main">
      {isModalOpen && Object.keys(formError).length === 0 && isSubmit && (
        <div className="main__popup">
          <img src={tick} alt="tick" />
          <h2 className="main__popup__thanks">Thank You !</h2>
          <p className="main__popup__text">
            Your account has been successfuly registered
          </p>
          <button className="button" onClick={handleCloseModal}>
            OK
          </button>
        </div>
      )}
      <form className="main__form" onSubmit={handleForm}>
        <h1>Create Account</h1>
        <div className="main__form__input">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={handleChange}
          />
        </div>
        {formError.username && (
          <p className="main__form__error">{formError.username}</p>
        )}
        <div className="main__form__input">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        {formError.email && (
          <p className="main__form__error">{formError.email}</p>
        )}

        <div className="main__form__input">
          <div className="main__form__input__eye" onClick={showPassword}>
            {toggle ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
          <input
            type={toggle ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        {formError.password && (
          <p className="main__form__error">{formError.password}</p>
        )}

        <button className="button" type="submit">
          Create account
        </button>
        <div className="main__form__nav">
          Already registered ? <Link to={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
