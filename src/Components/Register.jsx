import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "../Styles/Register.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Cropper from "./Cropper";
import Swal from "sweetalert2";

export function Register(props) {
  const [cropper, setCropper] = useState(false);
  const [error, setError] = useState("");
  const [imageIsUploaded, setImageIsUploaded] = useState(false);
  const navigator = useNavigate();

  //Start State
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    image: "",
    password: "",
    title: "",
    confirm_password: "",
    verify_code: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    password: undefined,
    confirm_password: undefined,
  });

  const [databaseError, setdatabaseError] = useState("");

  const [isLoading, setisLoading] = useState(false);

  //End State

  useEffect(() => {
    async function registerUser() {
      const { data } = await Axios.post("http://localhost:3002/register", user);
      if (data.message) {
        props.loginUser({
          email: user.email,
          password: user.password,
        });
      } else if (data.error) {
        setError(data.error);
      }
    }

    if (user.verify_code !== "") {
      registerUser();
    }
  }, [user.verify_code]);

  //Start Functions
  function editState(updateFunction, key, value = "") {
    updateFunction((oldState) => {
      return { ...oldState, [key]: value };
    });
  }

  function openCropper() {
    setCropper(true);
  }

  function validatePassword(e) {
    const inputValue = e.currentTarget.value;
    const inputId = e.currentTarget.id;

    if (inputId === "password") {
      editState(setUser, inputId, inputValue);
      if (
        user.confirm_password !== inputValue ||
        user.confirm_password === ""
      ) {
        editState(
          setErrorMessages,
          "confirm_password",
          "Password doesn't match!"
        );
      } else {
        editState(setErrorMessages, "confirm_password");
      }
    }

    if (inputId === "confirm_password") {
      if (user.password === inputValue) {
        editState(setErrorMessages, "confirm_password");
        editState(setUser, inputId, inputValue);
      } else {
        editState(
          setErrorMessages,
          "confirm_password",
          "Password doesn't match!"
        );
      }
    }
  }

  function updateUser(e) {
    const inputValue = e.currentTarget.value;
    const inputId = e.currentTarget.id;

    setUser((oldState) => {
      return { ...oldState, [inputId]: inputValue };
    });
  }

  // async function submitUser(e) {
  //   e.preventDefault();
  //   const {data} = await Axios.post('http://localhost:3002/register', user)
  //   if (data.message) {
  //     props.loginUser({
  //       'email': user.email,
  //       'password': user.password
  //     })
  //   } else if (data.error) {
  //     setError(data.error)
  //   }
  // }

  async function submitUser(e) {
    e.preventDefault();
    await Axios.post("http://localhost:3002/verify_register", {
      email: user.email,
    });

    Swal.fire({
      title: "Please, check your email!",
      input: "text",
      text: "Submit verification code",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (code) => {
        setUser((oldState) => {
          return { ...oldState, verify_code: code };
        });
      },
    });
  }
  return (
    <>
      {/*Start Bootstrap React Form*/}
      <Form className="position-relative" onSubmit={submitUser}>
        <div className="personal pt-5 pb-4">
          <h2 className="h4 mb-4 text-center">FILL THE FORM</h2>
          <div className="inputs-groups">
            {/* First Name */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="first_name"
                autoComplete="off"
                placeholder="First Name"
                onChange={updateUser}
              />
              {errorMessages.first_name && (
                <span className="invalid-feedback">
                  {" "}
                  {errorMessages.first_name}{" "}
                </span>
              )}
            </Form.Group>

            {/* Last Name */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="last_name"
                autoComplete="off"
                placeholder="Last Name"
                onChange={updateUser}
              />
              {errorMessages.last_name && (
                <span className="invalid-feedback">
                  {" "}
                  {errorMessages.last_name}{" "}
                </span>
              )}
            </Form.Group>

            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="title"
                autoComplete="off"
                placeholder="Job Title"
                onChange={updateUser}
              />
              {errorMessages.last_name && (
                <span className="invalid-feedback">
                  {" "}
                  {errorMessages.last_name}{" "}
                </span>
              )}
            </Form.Group>

            {/* Image */}
            {imageIsUploaded ? (
              <Form.Group className="mb-3">
                <Form.Control
                  disabled
                  className="pointer"
                  type="text"
                  id="image"
                  autoComplete="off"
                  value="Successfull Upload"
                  onClick={openCropper}
                  onChange={updateUser}
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Control
                  className="pointer"
                  type="text"
                  id="image"
                  autoComplete="off"
                  placeholder="Profile Picture"
                  onClick={openCropper}
                />
              </Form.Group>
            )}

            {cropper && (
              <Cropper
                setCropper={setCropper}
                setUser={setUser}
                setImageIsUploaded={setImageIsUploaded}
              />
            )}

            {/* Email */}
            <Form.Group>
              <Form.Control
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Email"
                onChange={updateUser}
              />
              {errorMessages.email && (
                <span className="invalid-feedback">
                  {" "}
                  {errorMessages.email}{" "}
                </span>
              )}
            </Form.Group>
          </div>
        </div>
        <div className="tech pt-3 pb-4">
          <div className="inputs-groups">
            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
                onChange={validatePassword}
              />
              {errorMessages.password && (
                <span className="invalid-feedback">
                  {" "}
                  {errorMessages.password}{" "}
                </span>
              )}
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                id="confirm_password"
                placeholder="Re-type your password"
                onChange={validatePassword}
              />
              {errorMessages.confirm_password && (
                <span className="invalid-feedback">
                  {" "}
                  {errorMessages.confirm_password}{" "}
                </span>
              )}
            </Form.Group>
            {error && <span className="invalid-feedback"> {error} </span>}

            <Button
              id="register"
              type="submit"
              className="d-block ms-auto px-5 py-2"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "SUBMIT"
              )}
            </Button>
          </div>
        </div>
      </Form>
      {/*End Bootstrap React Form*/}
    </>
  );
}
