import { useState } from "react";

import instance from "../../axios/instance";

import Spinner from "react-bootstrap/Spinner";

import TextField from "@mui/material/TextField";
import { Container, Typography, Grid, Button, Box, Modal } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";

import ValidationSchema, { passwordResetValidationSchema } from "./ValidationSchema";

import { useSessionStorage } from "../../hooks/useSessionStorage";

import { FormTextField } from "theo-components";

import { useUserLoginContext } from "../../context/UserLoginContext";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  password: string;
}

export default function Login() {
  const API_URL = process.env.REACT_APP_API_URL;

  const USER_API_URL = process.env.REACT_APP_USER_API_URL;
  const ADMIN_USER = process.env.REACT_APP_ADMIN_USER;

  const [accessToken, setAccessToken] = useSessionStorage<string[]>("accessToken", []);
  const [refreshToken, setRefreshToken] = useSessionStorage<string[]>("refreshToken", []);
  const { login, checkAdmin } = useUserLoginContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [pwdModelOpen, setPwdModelOpen] = useState(false);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [validName, setValidName] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [validAnswer, setValidAnswer] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const handleClose = () => setOpen(false);

  const handlePwdModelClose = () => setPwdModelOpen(false);

  const navigate = useNavigate();

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    margin: 0,
    padding: 0,
    p: 4
  };

  const handleForgetPassword = () => {
    setPwdModelOpen(true);
    setInput("Welcome");
  };

  const setUserName = (event: any) => {
    setUsername(event.target.value);
  };

  const handleValidName = () => {
    instance
      .get(`${USER_API_URL}/question/${username}`)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          console.log("question", response.data.data);
          setQuestion(response.data.data);
          setValidName(true);
        }
        console.log("@$# response", response);
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response.status === 404) {
          setUserMessage("Username Not Found Please try Again");
          console.log("USER NOT FOUND");
        }
      });
  };

  const handleValidAnswer = () => {
    const data = {
      question: question,
      answer: answer,
      userName: username
    };
    instance.post(`${USER_API_URL}/fgtPwd`, data).then((response) => {
      console.log("@$# Response", response);
      if (response.data.message === "details mismatch") {
        console.log("invalid answer");
        setAnswerStatus("Invalid answer Please try again");
        setValidAnswer(false);
      }
      if (response.data.message === "valid user") {
        setValidAnswer(true);
        setAnswerStatus("Provide New Password");
      }
    });
  };

  return (
    <Container
      maxWidth="md"
      className=" login-Box d-flex align-items-center justify-content-center ">
      <div className="border border-primary p-4 rounded login-BoxShadow">
        <Typography align="center" variant="h5" className="pb-2 login-title">
          Login Form
        </Typography>

        <Formik
          initialValues={{
            name: "",
            password: ""
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
            setLoading(true);
            const data = {
              userName: values.name,
              password: values.password
            };
            instance
              .post(`${USER_API_URL}/login`, data)
              .then((response) => {
                if (response.data.message === "login successful") {
                  setAccessToken(response.data.data.token);
                  setRefreshToken(response.data.data.refreshToken);
                  checkAdmin(values.name);
                  login(values.name);

                  if (values.name === ADMIN_USER) {
                    setLoading(false);
                    setErrorMessage("Login Successfull Now towards Product Management Page");
                    setOpen(true);
                    console.log(
                      "Access Token ==>> ",
                      accessToken,
                      "Refresh Token ==>> ",
                      refreshToken
                    );

                    setTimeout(() => {
                      navigate(`/productmgmt`);
                    }, 2000);
                  } else {
                    setLoading(false);

                    setErrorMessage("Login Successfull Navigating to our Store");
                    setOpen(true);
                    setTimeout(() => {
                      navigate(`/home`);
                    }, 2000);
                  }
                }
              })
              .catch((error) => {
                console.log("error", error);

                console.error("error", error.response.data.message);

                if (error.response.data.message === "Incorrect Password, Try again!") {
                  setLoading(false);

                  setErrorMessage("Incorrect password Please Try Again");
                  setOpen(true);
                }

                if (error.response.data.message === "User not found") {
                  setLoading(false);

                  setErrorMessage("Username Not Registered ");
                  setOpen(true);
                }
              });

            formikHelpers.setSubmitting(false);
          }}>
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="name"
                    label="Name"
                    data-testid="test_username"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="password"
                    type="password"
                    label="Password"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    size="large"
                    data-testid="test_submit"
                    color="primary"
                    disabled={formikProps.isSubmitting}>
                    {loading && (
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className=" mx-0 me-2 p-0 "
                      />
                    )}
                    Login
                  </Button>
                  {/* <Spinner animation="border" className="mx-3" variant="primary" /> */}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <p className="mb-0 mt-3 p-0" onClick={handleForgetPassword}>
          Forgot Password?
        </p>
      </div>
      <Modal
        open={pwdModelOpen}
        onClose={handlePwdModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="border border-secondary p-4 rounded" sx={style}>
          {!resetPassword && input && (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Enter Your Username
              </Typography>
              <TextField
                className="my-3 w-100"
                required
                id="outlined-required"
                onChange={setUserName}
                label="User Name"
              />
              {!validName && (
                <>
                  <p>{userMessage}</p>
                  <Button onClick={handleValidName} className="float-end" variant="contained">
                    Next
                  </Button>
                </>
              )}
              {validName && (
                <>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Provide Answer for below Security Question
                  </Typography>
                  <TextField
                    className="my-3 w-100"
                    disabled
                    label="Security Question"
                    value={question}
                    id="outlined-required"
                  />
                  <TextField
                    className="my-3 w-100"
                    required
                    id="outlined-required"
                    onChange={(event) => setAnswer(event?.target.value)}
                    label="Security Answer"
                  />
                  <p>{answerStatus}</p>
                  {validAnswer && (
                    <>
                      <Formik
                        initialValues={{
                          name: "",
                          password: ""
                        }}
                        validationSchema={passwordResetValidationSchema}
                        onSubmit={(
                          values: FormValues,
                          formikHelpers: FormikHelpers<FormValues>
                        ) => {
                          setLoading(true);
                          const data = {
                            question: question,
                            answer: answer,
                            userName: username,
                            password: values.password
                          };
                          instance
                            .post(`${USER_API_URL}/resetPwd`, data)
                            .then((response) => {
                              console.log("response", response);
                              if (response.data.message === "password resetted") {
                                console.log("password resetted successfully");
                                setResetPassword(true);
                                setLoading(false);
                              }
                            })
                            .catch((error) => {
                              console.log("error", error);
                              console.error("error", error.response.data.message);
                            });

                          formikHelpers.setSubmitting(false);
                        }}>
                        {(formikProps: FormikProps<FormValues>) => (
                          <Form noValidate autoComplete="off">
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Field
                                  name="password"
                                  type="password"
                                  label="Password"
                                  size="small"
                                  component={FormTextField}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Field
                                  name="verifyPassword"
                                  type="password"
                                  label="Verify Password"
                                  size="small"
                                  component={FormTextField}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  type="submit"
                                  variant="outlined"
                                  size="large"
                                  data-testid="test_submit"
                                  color="primary"
                                  disabled={formikProps.isSubmitting}>
                                  {loading && (
                                    <Spinner
                                      as="span"
                                      animation="grow"
                                      size="sm"
                                      role="status"
                                      aria-hidden="true"
                                      className=" mx-0 me-2 p-0 "
                                    />
                                  )}
                                  Reset Password
                                </Button>
                              </Grid>
                            </Grid>
                          </Form>
                        )}
                      </Formik>
                    </>
                  )}
                  {!validAnswer && (
                    <Button onClick={handleValidAnswer} className="float-end" variant="contained">
                      Next
                    </Button>
                  )}
                </>
              )}
            </>
          )}
          {resetPassword && (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Password Reset Successfull
              </Typography>
              <div className="  float-end ">
                <Button onClick={handlePwdModelClose} variant="contained">
                  Ok
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="border border-secondary p-2 rounded" sx={style}>
          {errorMessage && (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <div className="  float-end ">
            <Button onClick={handleClose} variant="contained">
              Ok
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}
