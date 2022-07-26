import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Spinner from "react-bootstrap/Spinner";
import { Container, Typography, Grid, Button } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";

import ValidationSchema from "./ValidationSchema";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { FormTextField } from "../../components/FormTextField/FormTextField";
import { useUserLoginContext } from "../../context/UserLoginContext";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  password: string;
}

export default function Login() {
  const USER_API_URL = process.env.REACT_APP_USER_API_URL;
  const ADMIN_USER = process.env.REACT_APP_ADMIN_USER;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useSessionStorage<string[]>(
    "accessToken",
    []
  );
  const [refreshToken, setRefreshToken] = useSessionStorage<string[]>(
    "refreshToken",
    []
  );
  const { login, checkAdmin } = useUserLoginContext();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    margin: 0,
    padding: 0,
    p: 4,
  };

  return (
    <Container
      maxWidth="md"
      className="   rounded d-flex align-items-center justify-content-center "
      style={{ minHeight: "350px", marginTop: "20px" }}
    >
      <div
        className="border border-primary p-4 rounded "
        style={{
          textAlign: "center",
          width: "15rem",
          boxShadow: "1px 3px 38px 10px rgba(139,149,237,1)",
        }}
      >
        <Typography
          align="center"
          variant="h5"
          style={{ lineHeight: 1.25, marginBottom: 16 }}
        >
          Login Form
        </Typography>

        <Formik
          initialValues={{
            name: "",
            password: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={(
            values: FormValues,
            formikHelpers: FormikHelpers<FormValues>
          ) => {
            setLoading(true);
            let data = {
              userName: values.name,
              password: values.password,
            };
            axios
              .post(`${USER_API_URL}/login`, data)
              .then((response) => {
                if (response.data.message === "login successful") {
                  setAccessToken(response.data.data.token);
                  setRefreshToken(response.data.data.refreshToken);
                  checkAdmin(values.name);
                  login(values.name);

                  if (values.name === ADMIN_USER) {
                    setLoading(false);
                    setErrorMessage(
                      "Login Successfull Now towards Product Management Page"
                    );
                    setOpen(true);
                    setTimeout(() => {
                      navigate(`/productmgmt`);
                    }, 2000);
                  } else {
                    setLoading(false);

                    setErrorMessage(
                      "Login Successfull Navigating to our Store"
                    );
                    setOpen(true);
                    setTimeout(() => {
                      navigate(`/home`);
                    }, 2000);
                  }
                }
              })
              .catch((error) => {
                console.log("error", error.response.data.message);

                if (
                  error.response.data.message ===
                  "Incorrect Password, Try again!"
                ) {
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
          }}
        >
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
                    disabled={formikProps.isSubmitting}
                  >
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
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="border border-secondary p-2 rounded" sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
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
