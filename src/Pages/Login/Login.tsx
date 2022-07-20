import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Container, Typography, Grid, Button } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";

import { FormTextField } from "../../components/FormTextField/FormTextField";
import ValidationSchema from "./ValidationSchema";

interface FormValues {
  name: string;
  password: string;
}

export default function Login() {
  const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

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
            console.log(values);

            axios
              .get(`${FIREBASE_URL}/${values.name}.json`)
              .then((response) => {
                if (values.name === response.data.name) {
                  console.log(
                    values.name,
                    "available name",
                    response.data.name
                  );
                }
                if (values.password !== response.data.password) {
                  console.log("invalid password");
                  setErrorMessage("Username Registered Invalid password");
                  setOpen(true);
                }
                console.log(username, password);
              })
              .catch((error_12) => {
                setErrorMessage("Username Not Registered ");
                setOpen(true);
                console.log(error_12)
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
                    Submit
                  </Button>
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
